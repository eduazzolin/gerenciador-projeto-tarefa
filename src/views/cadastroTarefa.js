import React, {useEffect, useState} from "react";
import TituloPagina from "../components/app/tituloPagina";
import {Button, Form} from "react-bootstrap";
import {tarefaPrototype, TarefaService} from "../app/service/tarefaService";
import ProjetoService from "../app/service/projetoService";
import {consultarStatusENUM} from "../app/service/statusService";
import {useLocation, useNavigate} from "react-router-dom";
import {mensagemErro, mensagemSucesso} from "../components/app/toastr";

function CadastroTarefa() {

  const location = useLocation();
  const navigate = useNavigate();
  const tarefaRecebida = location.state?.tarefa;

  const [tarefa, setTarefa] = useState(tarefaRecebida || {});
  const [projetos, setProjetos] = useState([]);
  const [status, setStatus] = useState([]);
  const projetoService = new ProjetoService();

  const service = new TarefaService();

  useEffect(() => {
    projetoService.consultar().then(response => {
      setProjetos(response.data);
    }).catch(error => {
      console.error('Erro ao buscar projetos', error);
    });

    consultarStatusENUM().then(response => {
      setStatus(response);
    })

  }, []);

  useEffect(() => {
    if (tarefaRecebida) {
      setTarefa(tarefaRecebida);
    }
  }, [tarefaRecebida]);

  const handleSave = () => {
    if (tarefa.id) {
      console.log('Atualizando tarefa:', tarefa);
    } else {
      console.log('Criando novo tarefa:', tarefa);
    }
    service
      .salvar(tarefa)
      .then(response => {
        mensagemSucesso('Tarefa cadastrado com sucesso!');
        navigate(-1);
      })
      .catch(error => {
        mensagemErro('Erro ao criar tarefa');
        console.log(error);
      })
  };

  return (
    <div className={'container'}>
      <TituloPagina titulo={'Nova Tarefa'}/>

      <div className="row">

        <div className="col-12">

          <Form>

            <div className="d-flex flex-row gap-3">
              <div className="px-0 flex-grow-1">

                <Form.Group className="mb-3">
                  <Form.Label>Projeto</Form.Label>
                  <Form.Select
                    aria-label="Projeto"
                    value={tarefa.idProjeto}
                    onChange={event => {
                      setTarefa({...tarefa, idProjeto: event.target.value});
                    }}>
                    <option value={''}>Selecione um projeto</option>
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
                    value={tarefa.idStatus}
                    onChange={event => {
                      setTarefa({...tarefa, idStatus: event.target.value});
                    }}>
                    <option value={''}>Selecione um status</option>
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
              <Button className="ms-auto mt-3" variant="primary" onClick={handleSave}> Salvar </Button>
            </div>
          </Form>


        </div>
      </div>

    </div>
  )
}

export default CadastroTarefa;