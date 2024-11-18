import React from 'react';
import {Button} from "react-bootstrap";
import {FaTrash} from "react-icons/fa";

export default function CartaoComentario({comentario, funcaoDeletar, index}) {
  return (
    <div className="border bg-white rounded mb-3" key={index}>
      <div className="row p-3">

        <div className="col-12">
          <span className="mb-2">{comentario.comentario}</span>
        </div>

        <div className="col-12 d-flex align-items-end">

          <span className="mb-0 ms-auto small text-muted">
  {(() => {
    try {
      return new Date(...comentario.dataCriacao).toLocaleString();
    } catch (error) {
      return ''
    }
  })()}
</span>
          <a className="ms-2" href={'#'} onClick={() => funcaoDeletar(comentario)}><FaTrash/></a>
        </div>


      </div>
    </div>
  );
}
