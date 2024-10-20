import React, {useContext, useEffect, useState} from "react";
import TituloPagina from "../components/tituloPagina";
import {Button, Form} from "react-bootstrap";
import {tarefaPrototype} from "../app/service/tarefaService";

function CadastroTarefa() {
  const [tarefa, setTarefa] = useState(tarefaPrototype);


  return (
    <div className={'container'}>
      <TituloPagina titulo={'Novo Tarefa'}/>

      <div className="row">

        <div className="col-12">

          <Form>

            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o título do tarefa"
                value={tarefa.nome}
                onChange={event => setTarefa({...tarefa, nome: event.target.value})}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={9}
                value={tarefa.descricao}
                onChange={event => setTarefa({...tarefa, descricao: event.target.value})}/>
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button className="ms-auto mt-3" variant="primary" onClick={() => console.log(tarefa)}> Salvar </Button>
            </div>
          </Form>


        </div>
      </div>

    </div>
  )
}

export default CadastroTarefa;