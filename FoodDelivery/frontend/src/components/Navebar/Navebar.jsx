import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import './Navebar.css'
import { Link } from 'react-router-dom'
import{ useContext} from 'react'
import { StoreContext } from '../context/StoreContext'
import { useNavigate } from 'react-router-dom'
function Navebar({setShowLogin}) {
  const [menu,setMenu]=useState("home");
 const {getTotleCartAmount,token,setToken} = useContext(StoreContext);

 const nevigate=useNavigate();
 const logout=()=>{
  localStorage.removeItem("token");
  setToken("");
  nevigate("/");
  setShowLogin(false);

 }
  return (
    <div className='navebar'>
        <Link to={'/'}><img src={assets.logo} alt="" className='logo' /></Link>
      <ul className="navebar-menu">
        <Link to={'/'}onClick={()=>{setMenu("home")}} className={menu === "home"?"active":""}>home</Link>
        <a   href='#explore-menu' onClick={()=>{setMenu("menu")}} className={menu === "menu"?"active":""}>menu</a>
        <a href='#app-download'  onClick={()=>{setMenu("mobial-app")}} className={menu === "mobial-app"?"active":""}>mobial-app</a>
        <a  href='#footer-content'  onClick={()=>{setMenu("contact-us")}} className={menu === "contact-us"?"active":""}>contact-us</a>
      </ul>
    <div className="navebar-right">
      <img src={assets.search_icon} alt="" />
      <div className="navebar-search-icon">
        <Link to={'/cart'}><img src={assets.basket_icon} alt="" /></Link>
        <div className={getTotleCartAmount()===0?"":"dot"}></div>
      </div>
    </div>
    {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>:
    <div className='profile-icon'>
      <img src={assets.profile_icon} alt="" />
      <ul className='profile-dropdown'>
        <li><img src={assets.bag_icon} alt="" /><p>Order</p></li>
        <li onClick={logout}><img src={assets.logout_icon} alt="" /><p></p>Logout</li>
      </ul>
    </div>
    }
       
    </div>
   
  )
}

export default Navebar
