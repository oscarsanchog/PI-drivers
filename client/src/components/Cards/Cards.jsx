import { useDispatch, useSelector } from "react-redux"
import Card from "../Card/Card"
import Pagination from "../Pagination/Pagination"
import { useState, useEffect } from "react"
import { getDrivers } from "../../redux/actions"

const Cards = () => {
  const drivers = useSelector((state) => state.drivers)
  const driversFiltered = useSelector((state) => state.driversFiltered)
  const dispatch = useDispatch()

  useEffect(() => {
    drivers.length === 0 && dispatch(getDrivers()) // Verifica si drivers tiene longitud 0 y llama a dispatch para obtener los datos
  }, [driversFiltered])

  const [page, setPage] = useState(1)

  const driversPerPage = 9

  const numberOfPages = Math.ceil(drivers.length / driversPerPage)

  const firstOfThePage = (page - 1) * driversPerPage // La página -1 es porque page inicia en 1, y yo necesito el indice 0, que es el primero
  const lastOfThePage = (page - 1) * driversPerPage + driversPerPage

  const renderCardHandler = () => {
    return (
      driversFiltered.length > 0
      ? driversFiltered
          .slice(firstOfThePage, lastOfThePage)
          .map(({ id, image, name, teams }) => {
            return (
              <Card key={id} id={id} image={image} name={name} teams={teams} />
            )
          })
      : drivers
          ?.slice(firstOfThePage, lastOfThePage)
          ?.map(({ id, image, name, teams }) => {
            return (
              <Card key={id} id={id} image={image} name={name} teams={teams} />
            )
          })
    )
  }


  return (
    <section>
      <ul>{renderCardHandler()}</ul>
      <Pagination page={page} setPage={setPage} numberOfPages={numberOfPages} />
    </section>
  )
}

export default Cards
