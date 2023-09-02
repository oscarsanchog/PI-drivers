import { useState } from "react"

const Pagination = ({ page, setPage, numberOfPages }) => {
  const [input, setInput] = useState(1)

  const previousPage = () => {
    setInput(+input - 1)
    setPage(page - 1)
  }

  const nextPage = () => {
    setInput(+input + 1)
    setPage(page + 1)
  }

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      
      const requestedPage = +event.target.value

      if (requestedPage <= 1 || isNaN(requestedPage)) {
        setPage(1)
        setInput(1)
        return
      }
      else if (requestedPage > numberOfPages) {
          setInput(numberOfPages)
          setPage(numberOfPages)
          return
      }
      setPage(requestedPage)
    }
  }

  const onChange = (event) => {
    setInput(event.target.value)
  }

  const onClick = () => {
    setInput('')
  }

  return (
    <div>
      <button disabled={page <= 1} onClick={previousPage}>◀️</button>
      <input
        type="text"
        value={input}
        name="page"
        onChange={(event) => onChange(event)}
        onKeyDown={(event) => onKeyDown(event)}
        onClick={onClick}
      />
      <span>of {numberOfPages}</span>
      <button disabled={page >= 56} onClick={nextPage}>▶️</button>
    </div>
  )
}

export default Pagination
