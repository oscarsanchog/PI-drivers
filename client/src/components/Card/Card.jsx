import { Link } from "react-router-dom"
import { teamsFormat } from "../../utils/teamsFormat"
import style from "./Card.module.css"

const Card = ({ id, image, name, teams, dob }) => {
  return (
    <li className={style.card}>
      <Link to={`/detail/${id}`}>
        <img className={style.img} src={image.url} alt={`${name.forename} ${name.surname}`} />
      </Link>

             
        <Link to={`/detail/${id}`}>
          <h2>{name.forename} {name.surname}</h2>
        </Link>
      
      <p>Teams: {teamsFormat(id, teams)} </p>
      <p>Birthdate: {dob}</p>
    </li>
  )
}

export default Card
