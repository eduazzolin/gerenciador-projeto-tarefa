import React from 'react';
import {Button} from "react-bootstrap";

export default function CartaoComentario({ comentario, index }) {
  return (
    <div className="border bg-white rounded mb-3" key={index}>
      <div className="row p-3">

        <div className="col-12">
          <span className="mb-2">{comentario.comentario}</span>
        </div>


      </div>
    </div>
  );
}
