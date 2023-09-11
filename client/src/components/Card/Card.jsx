import { Link } from "react-router-dom"
import { teamsFormat } from "../../utils/teamsFormat"
import styles from "./Card.module.css"

const Card = ({ id, image, name, teams, dob }) => {
  return (
    <li className={styles.card}>
      <Link to={`/detail/${id}`}>
        <img className={styles.img} src={image.url} alt={`${name.forename} ${name.surname}`} />
      </Link>

             
        <Link to={`/detail/${id}`}>
          <h2>{name.forename} {name.surname}</h2>
        </Link>
      
      <p className={styles.cardTeams}>Teams: {teamsFormat(id, teams)} </p>
      <p >Birthdate: {dob}</p>
    </li>
  )
}

export default Card
