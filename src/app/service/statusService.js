export const statusPrototype = {
  "id": 0,
  "nome": ""
}

export async function consultarStatusENUM() {
  return [
    {id: 1, nome: "Pendente", cor: "secondary"},
    {id: 2, nome: "Fazendo", cor: "primary"},
    {id: 3, nome: "Bloqueado", cor: "warning"},
    {id: 4, nome: "Concluído", cor: "success"},
    {id: 5, nome: "Arquivado", cor: "info"}
  ]

}
