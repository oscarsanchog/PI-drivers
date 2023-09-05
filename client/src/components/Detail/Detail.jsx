import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { getDetail, cleanDetail } from "../../redux/actions"
import { teamsFormat } from "../../utils/teamsFormat"

const Detail = () => {
  const driver = useSelector((state) => state.driverDetail)
  const { image, name, nationality, description, dob, teams } = driver
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getDetail(id))
    return () => dispatch(cleanDetail())
  }, [id])

  return (
    <section>
      {!driver.id ? (
        <p>⌛</p>
      ) : (
        <>
          <img src={image.url} alt={`${name.forename} ${name.surname}`} />
          <h2>
            Name: {name.forename} {name.surname}
          </h2>
          <h3>Nationality: {nationality}</h3>
          <p>Birthdate: {dob}</p>
          <p>Teams: {teamsFormat(id, teams)}</p>
          <p>Description: {description}</p>
        </>
      )}
    </section>
  )
}

export default Detail
