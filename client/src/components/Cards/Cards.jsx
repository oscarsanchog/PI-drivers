import Card from "../Card/Card"
import Pagination from "../Pagination/Pagination"
import { useState } from "react"

const Cards = ({ drivers }) => {
  const [page, setPage] = useState(1)
  const [driversPerPage, setDriversPerPage] = useState(9) //! En realidad este podría ser solo una constante

  const numberOfPages = Math.ceil(drivers.length / driversPerPage)
  console.log(numberOfPages);

  const firstOfThePage = (page - 1) * driversPerPage // La página -1 es porque page inicia en 1, y yo necesito el indice 0, que es el primero
  const lastOfThePage = (page - 1) * driversPerPage + driversPerPage

  return (
    <section>
        <Pagination
          page={page}
          setPage={setPage}
          numberOfPages={numberOfPages}
        />
      <ul>
        {drivers
          .slice(firstOfThePage, lastOfThePage)
          .map(({ id, image, name, teams }) => {
            return (
              <Card key={id} id={id} image={image} name={name} teams={teams} />
              )
            })}
      </ul>
    </section>
  )
}

export default Cards
