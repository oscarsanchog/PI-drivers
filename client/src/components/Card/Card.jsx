import { Link } from "react-router-dom"

//TODO Mostrar teams de drivers de la db. Quizás es con for in
const Card = ({ id, image, name, teams }) => {
  const regex = /,(?!\s)/g 
  
  return (
    <li>
      <Link to={`/detail/${id}`}>
        <img src={image.url} alt={`${name.forename} ${name.surname}`} />
      </Link>

      <h2>
        Name:
        {
          <Link to={`/detail/${id}`}
            > {name.forename} {name.surname}
          </Link>
        }
      </h2>
      
        
      <h2>Teams:{' '}
        {
          !isNaN(id)
          ? teams.replace(regex, ', ') // Para separar 'team, team' cuando no tenga tal formato
          : teams.map(team => team.name).join(', ') // Mapea en su prop name al array de los teams de los drivers de la db y luego los transforma en string para mostrarlos
        }
      </h2>
    </li>
  )
}

export default Card
