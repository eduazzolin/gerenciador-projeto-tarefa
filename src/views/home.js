import React, {useEffect, useState} from "react";
import TituloPagina from "../components/app/tituloPagina";
import {Button} from "react-bootstrap";
import ProjetoService, {projetoPrototype} from "../app/service/projetoService";
import {consultarStatusENUM} from "../app/service/statusService";
import {TarefaService} from "../app/service/tarefaService";
import BlocoTarefasPorStatus from "../components/blocoTarefasPorStatus/blocoTarefasPorStatus";
import {useNavigate} from "react-router-dom";
import LocalStorageService from "../app/service/localStorageService";
import {mensagemErro} from "../components/app/toastr";

export default function Home() {
  const [tarefas, setTarefas] = useState([]);
  const [tarefasAgrupadas, setTarefasAgrupadas] = useState({});
  const [projetoSelecionado, setProjetoSelecionado] = useState(projetoPrototype);
  const [statusENUM, setStatusENUM] = useState([]);
  const [isArquivadas, setIsArquivadas] = useState(false);
  const [idProjeto, setIdProjeto] = useState();
  const navigate = useNavigate();

  const projetoService = new ProjetoService();
  const tarefaService = new TarefaService();

  function filtrarApenasArquivadas() {
    setIsArquivadas(true);
    const agrupadas = agruparTarefasPorStatus(tarefas, statusENUM);
    const arquivadas = agrupadas["5"] || {status: statusENUM.find(s => s.id === 5), tarefas: []};
    setTarefasAgrupadas({"5": arquivadas});
  }

  function filtrarApenasNaoArquivadas() {
    setIsArquivadas(false);
    const agrupadas = agruparTarefasPorStatus(tarefas, statusENUM);
    const naoArquivadas = {...agrupadas};
    delete naoArquivadas["5"];
    setTarefasAgrupadas(naoArquivadas);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const idProjetoLocal = LocalStorageService.obterItem("ID_PROJETO");

        if (idProjetoLocal) {
          setIdProjeto(idProjetoLocal);
        } else {
          navigate("/projetos");
          return;
        }

        const responseProjetos = await projetoService.consultar();
        const projetos = responseProjetos.data;
        const projeto = projetos.find(projeto => projeto.id == idProjetoLocal);
        if (!projeto) {
          console.error("Projeto não encontrado");
          navigate("/projetos");
          return;
        }
        setProjetoSelecionado(projeto);

        const statusResponse = await consultarStatusENUM();
        setStatusENUM(statusResponse);

        const responseTarefas = await tarefaService.consultarPorProjeto(idProjetoLocal);
        setTarefas(responseTarefas.data);
      } catch (e) {
        if (e == "TOKEN") {
          mensagemErro("Sua sessão expirou. Faça login novamente.");
          navigate("/login");
          return;
        }
        console.error("Erro ao buscar dados", e);
        navigate("/projetos");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (tarefas && statusENUM && statusENUM.length > 0) {
      setTarefasAgrupadas(agruparTarefasPorStatus(tarefas, statusENUM));
      filtrarApenasNaoArquivadas();
    }
  }, [tarefas, statusENUM]);

  function agruparTarefasPorStatus(tarefas, statusENUM) {
    return tarefas.reduce((acc, tarefa) => {
      const statusObj = statusENUM.find(status => status.id === tarefa.idStatus);
      if (!statusObj) {
        return acc;
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
    <div className="container">
      <TituloPagina titulo={projetoSelecionado.nome}/>

      <div className="row mb-3">
        <div className="col-12 p-0">
          <div className="d-flex flex-row gap-1 ms-3">
            <div>
              <Button variant="danger" className="my-3" onClick={() => navigate("/nova-tarefa/")}>
                Nova Tarefa
              </Button>
            </div>
            <div>
              <Button
                variant="dark"
                className="my-3"
                onClick={isArquivadas ? filtrarApenasNaoArquivadas : filtrarApenasArquivadas}
              >
                {isArquivadas ? "Todas" : "Arquivadas"}
              </Button>
            </div>
          </div>
          <div className="px-3 d-flex gap-3">
            {Object.values(tarefasAgrupadas).map((grupo, index) => (
              <BlocoTarefasPorStatus key={index} status={grupo.status} tarefas={grupo.tarefas} index={index}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}