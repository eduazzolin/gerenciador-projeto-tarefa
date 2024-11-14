import React, {useEffect, useState} from "react";
import TituloPagina from "../components/app/tituloPagina";
import {Button} from "react-bootstrap";
import ProjetoService from "../app/service/projetoService";
import CartaoProjeto from "../components/cartaoProjeto/cartaoProjeto";
import {useNavigate} from "react-router-dom";
import {mensagemErro, mensagemSucesso} from "../components/app/toastr";
import PopupConfirmacao from "../components/popupConfirmacao/popupConfirmacao";

function MeusProjetos() {
  const [projetos, setProjetos] = useState([]);
  const navigate = useNavigate();
  const service = new ProjetoService();
  const [visibleConfirmDialog, setVisibleConfirmDialog] = useState(false);
  const [projetoDeletar, setProjetoDeletar] = useState({});


  const abrirConfirmacao = (projeto) => {
    setVisibleConfirmDialog(true)
    setProjetoDeletar(projeto)
    console.log('Abrindo confirmação para deletar:', projeto);
  }

  const cancelarDelecao = () => {
    setVisibleConfirmDialog(false)
    setProjetoDeletar({})
  }

  const handleDeleteProjeto = () => {
    setVisibleConfirmDialog(false)
    service.deletar(projetoDeletar.id).then(response => {
      mensagemSucesso('Projeto excluído com sucesso!');
      service.consultar().then(response => {
        setProjetos(response.data);
      }).catch(error => {
        mensagemErro('Erro ao buscar projetos');
      });
    })
  }

  useEffect(() => {

    service.consultar().then(response => {
      setProjetos(response.data);
    }).catch(error => {
      mensagemErro('Erro ao buscar projetos');
    });


  }, []);

  return (
    <div className="container">

      <PopupConfirmacao
        visivel={visibleConfirmDialog}
        titulo="Confirmação"
        mensagem="Deseja realmente excluir este projeto?"
        onConfirm={handleDeleteProjeto}
        onCancel={cancelarDelecao}
      />


      <TituloPagina titulo="Meus Projetos"/>
      <div className="d-flex justify-content-center">
        <div className="mb-3">
          <Button className="" size={"lg"} variant="success" onClick={() => navigate('/novo-projeto')}> Novo
            Projeto </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {projetos.map((projeto) => (
            <CartaoProjeto key={projeto.id} projeto={projeto} deleteAction={abrirConfirmacao}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MeusProjetos;
