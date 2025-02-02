import React from 'react';
import './cartaoProjetoStyle.css';
import {Button} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import LocalStorageService from "../../app/service/localStorageService";

export default function CartaoProjeto({projeto, index, deleteAction}) {
  const navigate = useNavigate();
  const handleEditarProjeto = () => {
    navigate('/novo-projeto', {state: {projeto}});
  };

  const handleDeleteProjeto = () => {
    deleteAction(projeto);
  }

  const handleSelecionarProjeto = () => {
    LocalStorageService.adicionarItem('ID_PROJETO', projeto.id);
    navigate('/home');
  }

  return (
    <div className="card_container bg-light border rounded mb-3" key={index}>

      <div className="row p-3">
        <div className="col-12">
          <h5 className="mb-2">{projeto.nome}</h5>
        </div>

        <div className="col-12">
          <div className="text_descricao">
            {projeto.descricao}
          </div>
        </div>

        <div className="col-12 d-flex gap-2 justify-content-end">
          <Button
            size="sm"
            variant="danger"
            className="mt-3"
            onClick={handleDeleteProjeto}
          >Remover</Button>
          <Button
            size="sm"
            variant="primary"
            className="mt-3"
            onClick={handleEditarProjeto}
          >
            Editar
          </Button>
          <Button
            size="sm"
            variant="outline-dark"
            className="mt-3"
            onClick={handleSelecionarProjeto}
          >
            Selecionar
          </Button>
        </div>
      </div>
    </div>
  );
}
