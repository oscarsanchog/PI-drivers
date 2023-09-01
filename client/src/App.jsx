import { Route, Routes, useLocation } from "react-router-dom"
import './styles/App.css'

import LandingPage from './components/LandingPage/LandingPage'
import Nav from './components/Nav/Nav'
import Home from './components/Home/Home'
import Detail from './components/Detail/Detail'
import Form from './components/Form/Form'
import About from './components/About/About'

const App = () => {
  const { pathname } = useLocation()
  
  return (
    <div>
      {pathname !== '/' && <Nav/>}

      <Routes>
        <Route path="/" element={<LandingPage/>}/>

        <Route path="/home" element={<Home/>}/> 

        <Route path="/detail/:id" element={<Detail/>}/>

        <Route path="/form" element={<Form/>} />

        <Route path='/about' element={<About/>}/>
      </Routes>
    </div>
  )
}

export default App
