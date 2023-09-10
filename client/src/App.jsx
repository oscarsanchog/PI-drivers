import { Route, Routes, useLocation } from "react-router-dom"
import './styles/App.css'

import LandingPage from './components/LandingPage/LandingPage'
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import Detail from './components/Detail/Detail'
import Form from './components/Form/Form'
import { useDispatch } from "react-redux"
import { cleanDriversFiltered } from "./redux/actions"

const App = () => {
  const { pathname } = useLocation()
  const dispatch = useDispatch()

  const forCleanDriversFiltered = () => {
    dispatch(cleanDriversFiltered())
  }

  return (
    <div class='appContainer'>
      {pathname !== '/' && <Nav forCleanDriversFiltered={forCleanDriversFiltered}/>}

      <Routes>
        <Route path="/" element={<LandingPage/>}/>

        <Route path="/home" element={<Home forCleanDriversFiltered={forCleanDriversFiltered} />}/> 

        <Route path="/detail/:id" element={<Detail/>}/>

        <Route path="/form" element={<Form/>} />
      </Routes>
    </div>
  )
}

export default App
