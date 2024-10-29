export const historicoPrototype = {
  "id": 1,
  "data_criacao": "",
  "id_status_antigo": 1,
  "id_status_novo": 2,
  "tarefa": {
    "id": 1,
    "nome": "Tarefa 1"
  }
}

export async function consultarHistoricoPorProjeto() {
  return [
    {
      "id": 1,
      "data_criacao": "2021-10-14T00:00:00",
      "id_status_antigo": 1,
      "id_status_novo": 2,
      "tarefa": {
        "id": 1,
        "nome": "Tarefa 1"
      }
    },
    {
      "id": 2,
      "data_criacao": "2021-10-14T00:00:00",
      "id_status_antigo": 2,
      "id_status_novo": 3,
      "tarefa": {
        "id": 1,
        "nome": "Tarefa 1"
      }
    },
    {
      "id": 3,
      "data_criacao": "2021-10-14T00:00:00",
      "id_status_antigo": 3,
      "id_status_novo": 4,
      "tarefa": {
        "id": 2,
        "nome": "Tarefa 2"
      }
    },
    {
      "id": 4,
      "data_criacao": "2021-10-14T00:00:00",
      "id_status_antigo": 4,
      "id_status_novo": 5,
      "tarefa": {
        "id": 2,
        "nome": "Tarefa 2"
      }
    },
    {
      "id": 5,
      "data_criacao": "2021-10-14T00:00:00",
      "id_status_antigo": 5,
      "id_status_novo": 6,
      "tarefa": {
        "id": 3,
        "nome": "Tarefa 3"
      }
    },
    {
      "id": 6,
      "data_criacao": "2021-10-14T00:00:00",
      "id_status_antigo": 6,
      "id_status_novo": 7,
      "tarefa": {
        "id": 2,
        "nome": "Tarefa 2"
      }
    }
  ];
}