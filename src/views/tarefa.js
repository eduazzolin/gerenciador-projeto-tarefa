import React, {useContext, useEffect, useState} from "react";
import TituloPagina from "../components/app/tituloPagina";
import {Button, Form} from "react-bootstrap";
import {consultarPorId, tarefaPrototype} from "../app/service/tarefaService";
import BotaoStatus from "../components/botaoStatus/botaoStatus";
import {comentarioPrototype, consultarComentariosPorId} from "../app/service/comentarioService";
import CartaoComentario from "../components/cartaoComentario/cartaoComentario";
import {useParams} from "react-router-dom";

export default function Tarefa() {
  const {id} = useParams();
  const [tarefa, setTarefa] = useState(tarefaPrototype);
  const [comentarios, setComentarios] = useState([comentarioPrototype]);

  const mountPage = async () => {
    try {
      console.log(id)
      const responseTarefa = await consultarPorId(id);
      setTarefa(responseTarefa);
      const responseComentarios = await consultarComentariosPorId(id);
      setComentarios(responseComentarios);
    } catch (error) {
      console.log("Erro ao buscar dados", error);
    }
  };

  useEffect(() => {
    if (id) {
      mountPage();
    }
  }, [id]);

  return (
    <div className="container-fluid" style={{height: 'calc(100vh - 50px)'}}>
      <div className="row" style={{height: 'calc(100vh - 50px)'}}>

        {/* Verifica se a tarefa está carregada */}
        {tarefa ? (
          <>
            {/* Seção da tarefa */}
            <div className="col-7 p-4 ps-5">
              <h3 className="mb-2">{tarefa.nome}</h3>
              <div className="mb-2">
                <BotaoStatus status={tarefa.id_status} clicavel={true}/>
              </div>
              <p>{tarefa.descricao}</p>
            </div>

            {/* Seção dos comentários */}
            <div className="col-5 bg-light m-0 p-3 d-flex flex-column" style={{height: '100%'}}>
              <div className="p-3 overflow-auto" style={{flex: '1 1 auto', minHeight: 0}}>
                {comentarios.map((comentario) => (
                  <CartaoComentario key={comentario.id} comentario={comentario}/>
                ))}
              </div>
              <div className="p-3 mt-auto" style={{height: '200px'}}>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control as="textarea" rows={3} placeholder="Digite seu comentário"/>
                  </Form.Group>
                  <div className="d-flex">
                    <Button variant="primary" className="ms-auto" type="submit">
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