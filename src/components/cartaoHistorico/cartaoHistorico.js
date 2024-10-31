import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {FaTrash} from "react-icons/fa";
import {consultarStatusENUM, statusPrototype} from "../../app/service/statusService";
import {historicoPrototype} from "../../app/service/historicoService";

export default function CartaoHistorico({historico, index}) {
  const [statusENUM, setStatusENUM] = useState([]);
  const [statusAntigo, setStatusAntigo] = useState(statusPrototype);
  const [statusNovo, setStatusNovo] = useState(statusPrototype);

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

  useEffect(() => {
    setStatusAntigo(statusENUM.find(s => s.id === historico.id_status_antigo));
    setStatusNovo(statusENUM.find(s => s.id === historico.id_status_novo));
  }, [statusENUM]);

  return (
    <div className="rounded mb-3 border" key={index}>
      <div className="row p-2">


        <div className="col-12 d-flex justify-content-between">
          <div className="small">{historico.tarefa.nome}</div>
          <div className="small text-muted">{new Date(historico.data_criacao).toLocaleString()}</div>
        </div>

        <div className="col-12">
          <div className="row ">

            <div className=" d-flex col-5 gap-1">
              {/*<div style={{color: statusAntigo ? statusAntigo.hex : '#000'}}>𒊹</div>*/}
              <div>{statusAntigo ? statusAntigo.nome : ""}</div>
            </div>

            <div className="col-2"> ></div>

            <div className="d-flex col-5 gap-1 ">
              {/*<div style={{color: statusNovo ? statusNovo.hex : '#000'}}>𒊹</div>*/}
              <div className="ms-auto">{statusNovo ? statusNovo.nome : ""}</div>
            </div>

          </div>

        </div>


      </div>


    </div>
  );
}
