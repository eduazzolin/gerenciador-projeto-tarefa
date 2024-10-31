import React, {useContext, useEffect, useState} from "react";
import TituloPagina from "../components/app/tituloPagina";
import {Button, Form} from "react-bootstrap";
import {projetoPrototype} from "../app/service/projetoService";

function CadastroProjeto() {
  const [projeto, setProjeto] = useState(projetoPrototype);


  return (
    <div className={'container'}>
      <TituloPagina titulo={'Novo Projeto'}/>

      <div className="row">

        <div className="col-12">

          <Form>

            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o título do projeto"
                value={projeto.nome}
                onChange={event => setProjeto({...projeto, nome: event.target.value})}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={9}
                value={projeto.descricao}
                onChange={event => setProjeto({...projeto, descricao: event.target.value})}/>
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button className="ms-auto mt-3" variant="primary" onClick={() => console.log(projeto)}> Salvar </Button>
            </div>
          </Form>


        </div>
      </div>

    </div>
  )
}

export default CadastroProjeto;