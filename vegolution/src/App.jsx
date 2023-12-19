import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ForgotPassword from './pages/Auth/ForgotPassword'
import Cart from './pages/Cart'
import CartHistory from './pages/CartHistory'
import SingleProduct from './pages/SingleProduct'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/forgot-password" element={<ForgotPassword />}/>
      <Route path="/contact" element={<Contact />}/>
      <Route path="/cart" element={<Cart />}/>
      <Route path="/cart/history" element={<CartHistory />}/>
      <Route path="*" element={<NotFound />}/>
      <Route path="/product/:name" element={<SingleProduct />}/>
    </Routes>
    </>
  )
}

export default App
