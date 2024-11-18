import React, {useContext, useEffect, useState} from "react";
import TituloPagina from "../components/app/tituloPagina";
import {Button, Form} from "react-bootstrap";
import {consultarPorId, tarefaPrototype, TarefaService} from "../app/service/tarefaService";
import BotaoStatus from "../components/botaoStatus/botaoStatus";
import {comentarioPrototype, consultarComentariosPorId} from "../app/service/comentarioService";
import CartaoComentario from "../components/cartaoComentario/cartaoComentario";
import {useNavigate, useParams} from "react-router-dom";
import {mensagemErro, mensagemSucesso} from "../components/app/toastr";

export default function Tarefa() {
  const {id} = useParams();
  const [tarefa, setTarefa] = useState({});
  const [comentarios, setComentarios] = useState([comentarioPrototype]);
  const navigate = useNavigate();
  const [comentario, setComentario] = useState();
  const service = new TarefaService();



  const handleEditarTarefa = () => {
    navigate('/nova-tarefa', {state: {tarefa}});
  };

  const handleComentar =  () => {
    service.salvarComentario(comentario).then(response => {
      setComentarios([...comentarios, response.data]);
    }).catch(error => {
      mensagemErro('Erro ao salvar comentário');
      console.log('Erro ao salvar comentário', error);
    })
  }

  const handleDeletarComentario = (p_comentario) => {
    console.log('Deletar comentário', p_comentario);

    service.deletarComentario(p_comentario).then(response => {
      mensagemSucesso('Comentário deletado com sucesso');
      const listaAtualizada = comentarios.filter(comentario => comentario.id !== p_comentario.id);
      setComentarios(listaAtualizada);
    }).catch(error => {
      mensagemErro('Erro ao deletar comentário');
      console.log('Erro ao deletar comentário', error);
    })
  }

  const mountPage = async () => {

    service.consultarPorId(id).then(response => {
      setTarefa(response.data);
    }).catch(error => {
      console.error('Erro ao buscar dados', error);
    });

    service.consultarComentariosPorIdTarefa(id).then(response => {
      setComentarios(response.data);
      console.log('Comentários', response.data);
    }).catch(error => {
      console.log('Erro ao buscar comentários', error);
    })

  };



  useEffect(() => {
    if (id) {
      mountPage();
    }
  }, [id]);

  const handleTrocarStatus = async (status) => {
    console.log('Trocar status', status);
    const tarefaAtualizada = {...tarefa, idStatus: status.id};
    try {
      await service.salvar(tarefaAtualizada);
      setTarefa(tarefaAtualizada);
    } catch (error) {
      console.error('Erro ao atualizar tarefa', error);
    }
  }

  return (
    <div className="container-fluid" style={{height: 'calc(100vh - 50px)'}}>
      <div className="row" style={{height: 'calc(100vh - 50px)'}}>

        {/* Verifica se a tarefa está carregada */}
        {tarefa ? (
          <>

            {/* Seção da tarefa */}
            <div className="col-7 p-4 ps-5 d-flex flex-column" style={{height: '100%'}}>

              <h3 className="mb-2">{tarefa.nome}</h3>

              <div className="mb-2 ">
                <BotaoStatus status={tarefa.idStatus} clicavel={true} acaoTrocar={handleTrocarStatus}/>
              </div>

              <div className="overflow-auto my-3" style={{flex: '1 1 auto', minHeight: 0}}>
                <p>{tarefa.descricao}</p>
              </div>

              <div className="d-flex mt-3">
                <Button variant="outline-dark" className="ms-auto" >
                  Editar
                </Button>
              </div>

            </div>

            {/* Seção dos comentários */}
            <div className="col-5 bg-light m-0 p-3 d-flex flex-column" style={{height: '100%'}}>
              <div className="p-3 overflow-auto" style={{flex: '1 1 auto', minHeight: 0}}>
                {comentarios.map((comentario) => (
                  <CartaoComentario key={comentario.id} comentario={comentario} funcaoDeletar={handleDeletarComentario}/>
                ))}
              </div>
              <div className="p-3 mt-auto" style={{height: '200px'}}>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control
                      as="textarea"
                      onChange={event => setComentario({
                       idTarefa: tarefa.id,
                       comentario: event.target.value
                      })}
                      rows={3} placeholder="Digite seu comentário"/>
                  </Form.Group>
                  <div className="d-flex">
                    <Button variant="outline-dark" className="ms-auto" type="submit" onClick={handleComentar}>
                      Comentar
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </>
        ) : (
          // Mensagem de carregamento provisória
          <div className="col-12 text-center">
            <p>Carregando dados da tarefa...</p>
          </div>
        )}

      </div>
    </div>
  );


}