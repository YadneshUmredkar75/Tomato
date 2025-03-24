import React from 'react'
import Navebar from './components/Navebar/Navebar'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import{useState} from 'react'
import LoginPopup from './components/LoginPopup/LoginPopup'
function App() {
  const [showLogin , setShowLogin] = useState(false);
  return (
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
    
    <div className='app'>
      <Navebar setShowLogin={setShowLogin} />
     <Routes >
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/placeorder' element={<PlaceOrder/>}/>
     </Routes>
    </div>
     <Footer />
    </>
  )
}

export default App
