export const statusPrototype = {
  "id": 0,
  "nome": "",
  "cor": "",
  "hex": ""
}

export async function consultarStatusENUM() {
  return [
    {id: 1, nome: "Pendente", cor: "secondary", hex: "#6c757d"},
    {id: 2, nome: "Fazendo", cor: "primary", hex: "#0d6efd"},
    {id: 3, nome: "Bloqueado", cor: "warning", hex: "#ffc107"},
    {id: 4, nome: "Concluído", cor: "success", hex: "#198754"},
    {id: 5, nome: "Arquivado", cor: "info", hex: "#0dcaf0"}
  ]

}
