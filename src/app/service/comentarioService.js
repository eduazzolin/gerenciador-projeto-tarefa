export const comentarioPrototype = {
"id": 1,
"comentario": "",
"data_criacao": "",
"id_tarefa": 1,
}

export async function consultarComentariosPorId() {
  return [
    {
      "id": 1,
      "comentario": "Foram feitas as alterações solicitadas.",
      "data_criacao": "2021-10-14T00:00:00",
      "id_tarefa": 1,
    },
    {
      "id": 2,
      "comentario": "Estou com dúvidas sobre o que deve ser feito. Ontem tentei falar com o responsável, mas não consegui.",
      "data_criacao": "2021-10-14T00:00:00",
      "id_tarefa": 1,
    },
    {
      "id": 3,
      "comentario": "O resultado foi entregue conforme solicitado.",
      "data_criacao": "2021-10-14T00:00:00",
      "id_tarefa": 1,
    },
  ]
}