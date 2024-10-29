import React, {useContext, useEffect, useState} from "react";
import TituloPagina from "../components/tituloPagina";
import {Button, Form} from "react-bootstrap";
import {consultarProjetos, projetoPrototype} from "../app/service/projetoService";
import {consultarStatusENUM} from "../app/service/statusService";
import {consultarHistoricoPorProjeto, historicoPrototype} from "../app/service/historicoService";
import {consultarTarefas, tarefaPrototype} from "../app/service/tarefaService";
import CartaoHistorico from "../components/cartaoHistorico/cartaoHistorico";

export default function Home() {
  const [projetos, setProjetos] = useState([projetoPrototype]);
  const [historico, setHistorico] = useState([historicoPrototype]);
  const [tarefas, setTarefas] = useState([tarefaPrototype]);
  const [projetoSelecionado, setProjetoSelecionado] = useState(projetoPrototype);

  const mountPage = async () => {
    try {
      const response_projetos = await consultarProjetos()
      const response_historico = await consultarHistoricoPorProjeto()
      const response_tarefas = await consultarTarefas()
      setProjetos(response_projetos)
      setHistorico(response_historico)
      setTarefas(response_tarefas)
    } catch (error) {
      console.log("Erro ao buscar dados", error)
    }
  }

  useEffect(() => {
    mountPage();
  }, []);

  return (
    <div className={'container-fluid'} style={{height: 'calc(100vh - 50px)'}}>
      <div className="row" style={{height: 'calc(100vh - 50px)'}}>

        {/*historico*/}
        <div className="col-4 bg-light m-0 p-4 ">
          <Form.Group className="mb-3">
            <Form.Label>Projeto</Form.Label>
            <Form.Select
              aria-label="Projeto"
              value={projetoSelecionado.id}
              onChange={event => {
                setProjetoSelecionado(event.target.value);
              }}>
              {
                projetos.map((projeto, index) => (
                  <option key={index} value={projeto.id}>{projeto.nome}</option>
                ))
              }
            </Form.Select>
          </Form.Group>

          <div
            className="p-3 overflow-auto"
            style={{flex: '1 1 auto', minHeight: 0}}
          >
            {historico.map((h) => (
              <CartaoHistorico key={h.id} historico={h}/>
            ))}
          </div>


        </div>

        {/*tarefas*/}
        <div className="col-8">


        </div>


      </div>
    </div>
  )
}