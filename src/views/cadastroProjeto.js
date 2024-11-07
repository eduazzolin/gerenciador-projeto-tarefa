import React, { useEffect, useState } from "react";
import TituloPagina from "../components/app/tituloPagina";
import { Button, Form } from "react-bootstrap";
import { projetoPrototype } from "../app/service/projetoService";
import { useLocation, useNavigate } from 'react-router-dom';

function CadastroProjeto() {
  const location = useLocation();
  const navigate = useNavigate();
  const projetoRecebido = location.state?.projeto;
  const [projeto, setProjeto] = useState(projetoRecebido || projetoPrototype);

  useEffect(() => {
    if (projetoRecebido) {
      setProjeto(projetoRecebido);
    }
  }, [projetoRecebido]);

  const handleSave = () => {
    if (projeto.id) {
      // Lógica para atualizar o projeto existente
      console.log('Atualizando projeto:', projeto);
    } else {
      // Lógica para criar um novo projeto
      console.log('Criando novo projeto:', projeto);
    }
    // Após salvar, redirecionar para "Meus Projetos"
    navigate(-1);
  };

  return (
    <div className={'container'}>
      <TituloPagina titulo={projeto.id ? 'Editar Projeto' : 'Novo Projeto'} />

      <div className="row">
        <div className="col-12">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o título do projeto"
                value={projeto.nome}
                onChange={event => setProjeto({ ...projeto, nome: event.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={9}
                value={projeto.descricao}
                onChange={event => setProjeto({ ...projeto, descricao: event.target.value })}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button
                className="ms-auto mt-3"
                variant="primary"
                onClick={handleSave}
              >
                Salvar
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CadastroProjeto;
