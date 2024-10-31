import React from 'react';

export default function TituloPagina({titulo, subtitulo}) {
  return (
    <div className={'row my-4'}>
      <div className={'col-12'}>
        <h1>{titulo}</h1>
        <span>{subtitulo}</span>
      </div>
    </div>
  )
}