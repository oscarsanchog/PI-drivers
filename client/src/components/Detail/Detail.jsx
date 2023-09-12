import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { getDetail, cleanDetail } from "../../redux/actions"
//import { teamsFormat } from "../../utils/teamsFormat"
import styles from "./Detail.module.css"

const Detail = ({ teamsFormat }) => {
  const driver = useSelector((state) => state.driverDetail)
  const { image, name, nationality, description, dob, teams } = driver
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getDetail(id))
    return () => dispatch(cleanDetail())
  }, [id])

  return (
    <div className={styles.detailContainer}>
      {driver.id && (
        <section className={styles.detail}>
          <img
            className={styles.detailImage}
            src={image.url}
            alt={`${name.forename} ${name.surname}`}
          />

          <div className={styles.detailInfo}>
            <h2>Name: {name.forename} {name.surname}</h2>
            <p><span>Nationality: </span>{nationality}</p>
            <p><span>Birthdate: </span>{dob}</p>
            <p><span>Teams: </span>{teamsFormat(id, teams)}</p>
            <p className={styles.detailDescription}><span>Description: </span>{teamsFormat(id, teams)} {description}</p>
          </div>
        </section>
      )}
    </div>
  )
}

export default Detail
