export const teamsFormat = (id, teams) => {
  const teamStringFormat = /,(?!\s)/g
  
  return !isNaN(id) // si el id es un numero, es un driver de la API
    ? (teams.replace(teamStringFormat, ", ")) // Para separar 'team, team' cuando no tenga tal formato en la API
    : teams.map((team) => team.name).join(", ") // Mapea en su prop name al array de los teams de los drivers de la db y luego los transforma en string para renderizarlos
}
