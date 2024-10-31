import React from 'react';

export default function BarraStatus({status}) {

  return (
    <div className={`p-1 px-2 bg-${status.cor}`} >
      <div className="text-white">{status.nome}</div>
    </div>
  )



}