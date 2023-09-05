import { Link } from "react-router-dom"
import { teamsFormat } from "../../utils/teamsFormat"

const Card = ({ id, image, name, teams }) => {
  return (
    <li>
      <Link to={`/detail/${id}`}>
        <img src={image.url} alt={`${name.forename} ${name.surname}`} />
      </Link>

      <h2>
        Name:
        <Link to={`/detail/${id}`}>
          {" "}
          {name.forename} {name.surname}
        </Link>
      </h2>

      <h3>Teams: {teamsFormat(id, teams)} </h3>
    </li>
  )
}

export default Card
