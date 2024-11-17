import React, {useContext, useEffect, useState} from "react";
import TituloPagina from "../components/app/tituloPagina";
import {Button, Form} from "react-bootstrap";
import ProjetoService, {consultarProjetos, projetoPrototype} from "../app/service/projetoService";
import {consultarStatusENUM, statusPrototype} from "../app/service/statusService";
import {consultarHistoricoPorProjeto, historicoPrototype} from "../app/service/historicoService";
import {consultarTarefas, tarefaPrototype, TarefaService} from "../app/service/tarefaService";
import CartaoHistorico from "../components/cartaoHistorico/cartaoHistorico";
import BlocoTarefasPorStatus from "../components/blocoTarefasPorStatus/blocoTarefasPorStatus";
import {useNavigate, useParams} from "react-router-dom";

export default function Home() {
  const {idProjeto} = useParams();
  const [tarefas, setTarefas] = useState([tarefaPrototype]);
  const [tarefasAgrupadas, setTarefasAgrupadas] = useState([{status: {statusPrototype}, tarefas: [tarefaPrototype]}]);
  const [projetoSelecionado, setProjetoSelecionado] = useState(projetoPrototype);
  const [statusENUM, setStatusENUM] = useState([]);
  const [isArquivadas, setIsArquivadas] = useState(false);
  const navigate = useNavigate();

  const projetoService = new ProjetoService();
  const tarefaService = new TarefaService();

  function filtrarApenasArquivadas() {
    setIsArquivadas(true);
    setTarefasAgrupadas(agruparTarefasPorStatus(tarefas, statusENUM))
    setTarefasAgrupadas(prevState => {
      const newState = {"5": prevState["5"]};
      return newState;
    });
  }

  function filtrarApenasNaoArquivadas() {
    setIsArquivadas(false);
    setTarefasAgrupadas(agruparTarefasPorStatus(tarefas, statusENUM))
    setTarefasAgrupadas(prevState => {
      const newState = {...prevState};
      delete newState["5"];
      return newState;
    });
  }

  useEffect(() => {
    projetoService.consultar().then(response => {

      const projetos = response.data;
      const projeto = projetos.find(projeto => projeto.id == idProjeto);
      if (!projeto) {
        console.error('Projeto não encontrado');
        return;
      }
      setProjetoSelecionado(projeto);
    })

    consultarStatusENUM().then(response => {
      setStatusENUM(response);
    })

    console.log('idProjeto:', idProjeto);
    tarefaService.consultarPorProjeto(idProjeto).then(response => {
      setTarefas(response.data);
      console.log('Tarefas:', response.data);
    }).catch(error => {
      console.error('Erro ao buscar tarefas', error);
    });

  }, []);

  useEffect(() => {
    if (tarefas && statusENUM) {
      setTarefasAgrupadas(agruparTarefasPorStatus(tarefas, statusENUM));
      filtrarApenasNaoArquivadas();
    }
  }, [tarefas]);


  function agruparTarefasPorStatus(tarefas, statusENUM) {
    return tarefas.reduce((acc, tarefa) => {
      const statusObj = statusENUM.find(status => status.id === tarefa.idStatus);
      if (!statusObj) {
        // console.warn(`Status com id ${tarefa.id_status} não encontrado em statusENUM.`);
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


  return (
    <div className="container" style={{height: 'calc(100vh - 50px)'}}>

      <TituloPagina titulo={projetoSelecionado.nome}/>


      <div className="row" style={{height: '100%'}}>

        {/* Coluna das tarefas */}
        <div className="col-12 p-0" style={{height: '100%', overflow: 'auto'}}>
          <div className="d-flex flex-row gap-1 ms-3">
            <div>
              <Button variant="danger" className="my-3" onClick={() => navigate('/nova-tarefa/')}>Nova Tarefa</Button>
            </div>
            <div>
              <Button variant="dark" className="my-3"
                      onClick={isArquivadas ? filtrarApenasNaoArquivadas : filtrarApenasArquivadas}>{isArquivadas ? 'Todas' : 'Arquivadas'}</Button>
            </div>
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