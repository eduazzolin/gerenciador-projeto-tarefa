import React, {useContext, useEffect, useState} from "react";
import TituloPagina from "../components/tituloPagina";
import {Button, Form} from "react-bootstrap";
import {consultarPorId, tarefaPrototype} from "../app/service/tarefaService";
import BotaoStatus from "../components/botaoStatus/botaoStatus";
import {comentarioPrototype, consultarComentariosPorId} from "../app/service/comentarioService";
import CartaoComentario from "../components/cartaoComentario/cartaoComentario";

export default function Tarefa() {
  const [tarefa, setTarefa] = useState(tarefaPrototype);
  const [comentarios, setComentarios] = useState([comentarioPrototype]);

  const mountPage = async () => {
    try {
      const responseTarefa = await consultarPorId();
      setTarefa(responseTarefa);
      const responseComentarios = await consultarComentariosPorId();
      setComentarios(responseComentarios);
    } catch (error) {
      console.log("Erro ao buscar dados", error);
    }
  };

  useEffect(() => {
    mountPage();
  }, []);

  return (
    <div className={'container'}>
      <div className="row py-4">

        {/*Seção da tarefa*/}
        <div className="col-7">
          <h3 className={"mb-2"}>{tarefa.nome}</h3>
          <div className={"mb-2"}><BotaoStatus status={tarefa.id_status}/></div>
          <p>{tarefa.descricao}</p>
        </div>


        {/*Seção dos comentários*/}
        <div className="col-5 bg-light rounded">
          <div className="p-3">
            {comentarios.map((comentario) => (
            <CartaoComentario key={comentario.id} comentario={comentario}/>
          ))}

          </div>
          <div></div>
        </div>


      </div>
    </div>
  )
}