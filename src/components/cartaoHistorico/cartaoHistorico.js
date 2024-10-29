import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {FaTrash} from "react-icons/fa";
import {consultarStatusENUM} from "../../app/service/statusService";

export default function CartaoHistorico({historico, index}) {
  const [statusENUM, setStatusENUM] = useState([]);

  const mountPage = async () => {
    try {
      const responseStatus = await consultarStatusENUM();
      setStatusENUM(responseStatus);

    } catch (error) {
      console.log("Erro ao buscar dados", error);
    }
  };

  useEffect(() => {
    mountPage();
  }, []);



  return (
    <div className="border bg-white rounded mb-3" key={index}>
      <div className="row p-3 d-flex ">
        <div className="col-6">
          <div className="small">{historico.tarefa.nome}</div>
        </div>
        <div className="col-6">
          <div className="small ms-auto text-muted">{new Date(historico.data_criacao).toLocaleString()}</div>
        </div>
        <div></div>
      </div>
      <div className="row p-3">
        {/*icone de bola da cor do status*/}
        <div className="col-1">
      </div>
    </div>
    </div>
  );
}
