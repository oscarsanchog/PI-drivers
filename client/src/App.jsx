import { Route, Routes, useLocation } from "react-router-dom"
import './styles/App.css'

import LandingPage from './components/LandingPage/LandingPage'
import Nav from './components/Nav/Nav'
import Cards from './components/Cards/Cards'
import Detail from './components/Detail/Detail'
import Form from './components/Form/Form'

const App = () => {
  const { pathname } = useLocation()
  
  return (
    <div>
      {pathname !== '/' && <Nav/>}

      <Routes>
        <Route path="/" element={<LandingPage/>}/>

        <Route path="/home" element={<Cards/>}/>

        <Route path="/detail/:id" element={<Detail/>}/>

        <Route path="/form" element={<Form/>} />
      </Routes>
    </div>
  )
}

export default App
