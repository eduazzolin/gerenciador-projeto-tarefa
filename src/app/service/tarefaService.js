export const tarefaPrototype = {
  "id": 1,
  "data_criacao": "",
  "descricao": "",
  "is_deleted": false,
  "nome": "",
  "id_projeto": 1,
  "id_status": 1,
}

export async function consultarPorId() {
  return {
    "id": 1,
    "data_criacao": "2021-10-14T00:00:00",
    "descricao": "Deve ser implementado a funcionalidade de login, onde o usuário deve informar o email e senha para acessar o sistema.",
    "is_deleted": false,
    "nome": "Implementar funcionalidade de login",
    "id_projeto": 1,
    "id_status": 3
  };
}

export async function consultarTarefas() {
  return [
    {
      "id": 1,
      "data_criacao": "2021-10-14T00:00:00",
      "descricao": "Deve ser implementado a funcionalidade de login, onde o usuário deve informar o email e senha para acessar o sistema.",
      "is_deleted": false,
      "nome": "Implementar funcionalidade de login",
      "id_projeto": 1,
      "id_status": 1,
    },
    {
      "id": 2,
      "data_criacao": "2021-10-14T00:00:00",
      "descricao": "Deve ser implementado a funcionalidade de cadastro de usuário, onde o usuário deve informar o nome, email e senha para acessar o sistema.",
      "is_deleted": false,
      "nome": "Implementar funcionalidade de cadastro de usuário",
      "id_projeto": 1,
      "id_status": 1,
    },
    {
      "id": 3,
      "data_criacao": "2021-10-14T00:00:00",
      "descricao": "Deve ser implementado a funcionalidade de cadastro de projeto, onde o usuário deve informar o nome e descrição do projeto.",
      "is_deleted": false,
      "nome": "Implementar funcionalidade de cadastro de projeto",
      "id_projeto": 1,
      "id_status": 1,
    },
    {
      "id": 4,
      "data_criacao": "2021-10-14T00:00:00",
      "descricao": "Deve ser implementado a funcionalidade de cadastro de tarefa, onde o usuário deve informar o nome e descrição da tarefa.",
      "is_deleted": false,
      "nome": "Implementar funcionalidade de cadastro de tarefa",
      "id_projeto": 1,
      "id_status": 1,
    },
    {
      "id": 5,
      "data_criacao": "2021-10-14T00:00:00",
      "descricao": "Deve ser implementado a funcionalidade de cadastro de status, onde o usuário deve informar o nome do status.",
      "is_deleted": false,
      "nome": "Implementar funcionalidade de cadastro de status",
      "id_projeto": 1,
      "id_status": 2,
    },
    {
      "id": 6,
      "data_criacao": "2021-10-14T00:00:00",
      "descricao": "Deve ser implementado a funcionalidade de cadastro de prioridade, onde o usuário deve informar o nome da prioridade.",
      "is_deleted": false,
      "nome": "Implementar funcionalidade de cadastro de prioridade",
      "id_projeto": 1,
      "id_status": 2,
    },
    {
      "id": 7,
      "data_criacao": "2021-10-14T00:00:00",
      "descricao": "Deve ser implementado a funcionalidade de cadastro de tipo de tarefa, onde o usuário deve informar o nome do tipo de tarefa.",
      "is_deleted": false,
      "nome": "Implementar funcionalidade de cadastro de tipo de tarefa",
      "id_projeto": 1,
      "id_status": 2,
    },
    {
      "id": 8,
      "data_criacao": "2021-10-14T00:00:00",
      "descricao": "Deve ser implementado a funcionalidade de cadastro de status de tarefa, onde o usuário deve informar o nome do status de tarefa.",
      "is_deleted": false,
      "nome": "Implementar funcionalidade de cadastro de status de tarefa",
      "id_projeto": 1,
      "id_status": 5,
    },
    {
      "id": 9,
      "data_criacao": "2021-10-14T00:00:00",
      "descricao": "Deve ser implementado a funcionalidade de cadastro de prioridade de tarefa, onde o usuário deve informar o nome da prioridade de tarefa.",
      "is_deleted": false,
      "nome": "Implementar funcionalidade de cadastro de prioridade de tarefa",
      "id_projeto": 1,
      "id_status": 4,
    },
    {
      "id": 10,
      "data_criacao": "2021-10-14T00:00:00",
      "descricao": "Deve ser implementado a funcionalidade de cadastro de tipo de tarefa, onde o usuário deve informar o nome do tipo de tarefa.",
      "is_deleted": false,
      "nome": "Implementar funcionalidade de cadastro de tipo de tarefa",
      "id_projeto": 1,
      "id_status": 3,
    }
  ];
}