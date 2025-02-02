import React, {useEffect, useState} from 'react';
import './botaoStatusStyle.css';
import Dropdown from "react-bootstrap/Dropdown";
import {consultarStatusENUM} from "../../app/service/statusService";
import {Button} from "react-bootstrap";

export default function BotaoStatus({status, clicavel, acaoTrocar}) {
  const [currentStatus, setCurrentStatus] = useState(null);
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

  useEffect(() => {
    if (statusENUM.length > 0) {
      const initialStatus = statusENUM.find(s => s.id === status);
      setCurrentStatus(initialStatus);
    }
  }, [statusENUM, status]);

  const handleSelect = (eventKey) => {
    const selectedStatus = statusENUM.find(s => s.id === parseInt(eventKey));
    setCurrentStatus(selectedStatus);
    acaoTrocar(selectedStatus);
  };

  return (
    clicavel ? (
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle
          variant={currentStatus ? currentStatus.cor : 'secondary'}
          id="dropdown-basic"
        >
          {currentStatus ? currentStatus.nome : 'Selecione um status'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {statusENUM.map((statusItem) => (
            <Dropdown.Item
              key={statusItem.id}
              eventKey={statusItem.id}
            >
              {statusItem.nome}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    ) : (
      <div className="botao-status">
        <Button className={`btn-${currentStatus ? currentStatus.cor : 'secondary'}`} >
          {currentStatus ? currentStatus.nome : ''}
        </Button>
      </div>
    )
  );

}
