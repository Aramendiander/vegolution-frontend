import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import SingleProduct from './pages/SingleProduct'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/contact" element={<Contact />}/>
      <Route path="*" element={<NotFound />}/>
      <Route path="/SingleProduct" element={<SingleProduct />}/>
    </Routes>
    </>
  )
}

export default App
