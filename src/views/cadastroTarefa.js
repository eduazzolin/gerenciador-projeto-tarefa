import React, {useContext, useEffect, useState} from "react";
import TituloPagina from "../components/tituloPagina";
import {Button, Form} from "react-bootstrap";
import {tarefaPrototype} from "../app/service/tarefaService";
import {consultarProjetos} from "../app/service/projetoService";
import {consultarStatusENUM} from "../app/service/statusService";

function CadastroTarefa() {
  const [tarefa, setTarefa] = useState(tarefaPrototype);
  const [projetos, setProjetos] = useState([]);
  const [status, setStatus] = useState([]);

  const mountPage = async () => {
    try {
      const response_projetos = await consultarProjetos()
      const response_status = await consultarStatusENUM()
      setProjetos(response_projetos)
      setStatus(response_status)
    } catch (error) {
      console.log("Erro ao buscar dados", error)
    }
  }

  useEffect(() => {
    mountPage();
  }, []);

  return (
    <div className={'container'}>
      <TituloPagina titulo={'Novo Tarefa'}/>

      <div className="row">

        <div className="col-12">

          <Form>

            <div className="d-flex flex-row gap-3">
              <div className="px-0 flex-grow-1">

                <Form.Group className="mb-3">
                  <Form.Label>Projeto</Form.Label>
                  <Form.Select
                    aria-label="Projeto"
                    value={tarefa.id_projeto.id}
                    onChange={event => {
                      setTarefa({...tarefa, id_projeto: {id: event.target.value}});
                    }}>
                    {
                      projetos.map((projeto, index) => (
                        <option key={index} value={projeto.id}>{projeto.nome}</option>
                      ))
                    }
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="px-0 flex-grow-1">

                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    aria-label="Status"
                    value={tarefa.id_status.id}
                    onChange={event => {
                      setTarefa({...tarefa, id_status: {id: event.target.value}});
                    }}>
                    {
                      status.map((status, index) => (
                        <option key={index} value={status.id}>{status.nome}</option>
                      ))
                    }
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
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