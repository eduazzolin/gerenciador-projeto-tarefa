import React from 'react';
import { useNavigate } from 'react-router-dom';
import './cartaoTarefaStyle.css';

export default function CartaoTarefa({ tarefa, status, index }) {
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  return (
    <div
      className="border p-2 bg-white bg-opacity-50 rounded mb-2 cartao-tarefa"
      key={index}
      onClick={() => navigate('/tarefa/' + tarefa.id)}
    >
      <div className="d-flex flex-row gap-1">
        <div style={{ color: status ? status.hex : '#000' }}>𒊹</div>
        <div>{tarefa.nome}</div>
      </div>
    </div>
  );
}
