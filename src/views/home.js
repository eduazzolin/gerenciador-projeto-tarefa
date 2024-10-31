import React, {useContext, useEffect, useState} from "react";
import TituloPagina from "../components/app/tituloPagina";
import {Button, Form} from "react-bootstrap";
import {consultarProjetos, projetoPrototype} from "../app/service/projetoService";
import {consultarStatusENUM} from "../app/service/statusService";
import {consultarHistoricoPorProjeto, historicoPrototype} from "../app/service/historicoService";
import {consultarTarefas, tarefaPrototype} from "../app/service/tarefaService";
import CartaoHistorico from "../components/cartaoHistorico/cartaoHistorico";
import BlocoTarefasPorStatus from "../components/blocoTarefasPorStatus/blocoTarefasPorStatus";
import {useNavigate} from "react-router-dom";

export default function Home() {
  const [projetos, setProjetos] = useState([projetoPrototype]);
  const [historico, setHistorico] = useState([historicoPrototype]);
  const [tarefas, setTarefas] = useState([tarefaPrototype]);
  const [projetoSelecionado, setProjetoSelecionado] = useState(projetoPrototype);
  const [statusENUM, setStatusENUM] = useState([]);
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  const mountPage = async () => {
    try {
      const response_projetos = await consultarProjetos()
      const response_historico = await consultarHistoricoPorProjeto()
      const response_tarefas = await consultarTarefas()
      const responseStatus = await consultarStatusENUM()
      setProjetos(response_projetos)
      setHistorico(response_historico)
      setTarefas(response_tarefas)
      setStatusENUM(responseStatus)
    } catch (error) {
      console.log("Erro ao buscar dados", error)
    }
  }

  useEffect(() => {
    mountPage();
  }, []);

  function agruparTarefasPorStatus(tarefas, statusENUM) {
    return tarefas.reduce((acc, tarefa) => {
      const statusObj = statusENUM.find(status => status.id === tarefa.id_status);
      if (!statusObj) {
        console.warn(`Status com id ${tarefa.id_status} não encontrado em statusENUM.`);
        return acc; // Ignora se o status não for encontrado
      }
      if (!acc[statusObj.id]) {
        acc[statusObj.id] = {
          status: statusObj,
          tarefas: []
        };
      }
      acc[statusObj.id].tarefas.push(tarefa);
      return acc;
    }, {});
  }

  const tarefasAgrupadas = agruparTarefasPorStatus(tarefas, statusENUM);
  console.log(tarefasAgrupadas);

  return (
  <div className="container-fluid" style={{ height: 'calc(100vh - 50px)' }}>
    <div className="row" style={{ height: '100%' }}>

      {/* Coluna do histórico */}
      <div className="col-3 bg-light m-0 p-4" style={{ height: '100%', overflow: 'hidden' }}>
        <Form.Group className="mb-3">
          <Form.Label>Projeto</Form.Label>
          <Form.Select
            aria-label="Projeto"
            value={projetoSelecionado.id}
            onChange={event => {
              setProjetoSelecionado(event.target.value);
            }}>
            {projetos.map((projeto, index) => (
              <option key={index} value={projeto.id}>{projeto.nome}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <div
          className="p-3 overflow-auto"
          style={{ maxHeight: 'calc(100% - 100px)', flex: '1 1 auto' }}
        >
          {historico.map((h) => (
            <CartaoHistorico key={h.id} historico={h} />
          ))}
        </div>
      </div>

      {/* Coluna das tarefas */}
      <div className="col-9 p-0" style={{ height: '100%', overflow: 'auto' }}>
        <div>
          <Button variant="danger" className="m-3" onClick={() => navigate('/nova-tarefa/')}>Nova Tarefa</Button>
        </div>
        <div className="px-3">
          {Object.values(tarefasAgrupadas).map((grupo, index) => (
            <BlocoTarefasPorStatus
              key={index}
              status={grupo.status}
              tarefas={grupo.tarefas}
              index={index}
            />
          ))}
        </div>
      </div>

    </div>
  </div>
);

}