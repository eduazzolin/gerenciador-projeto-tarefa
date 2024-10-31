import React from 'react';
import BarraStatus from "../barraStatus/barraStatus";
import CartaoTarefa from "../cartaoTarefa/cartaoTarefa";

export default function BlocoTarefasPorStatus({status, tarefas, index}) {


  return (
    <div key={index} className="bloco-tarefas mb-3">
      <BarraStatus status={status}/>
      <div className="bg-opacity-10 bg-dark p-3">
        <div className="tarefas">
          {tarefas.map((tarefa, index) => (
            <CartaoTarefa key={index} tarefa={tarefa} status={status}/>
          ))}

        </div>
      </div>
    </div>
  );


}