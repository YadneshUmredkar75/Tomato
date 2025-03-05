import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
function LoginPopup({setShowLogin}) {
  const [currstate,setCurrstate]=useState("Login");
  const handle=()=>{
    setShowLogin(false)

  }
  return (
    <div className='login-popup'>
      <form className='login-popup-container'>

      <div className="login-pupup-title">
      <h1>{currstate}</h1>
      <img onClick={handle}src={assets.cross_icon} alt="" />
      </div>

      <div className="login-popup-inputs">
      {currstate==="Login"?<></>: <input type="text" placeholder='Your name' name="" id="" required/>}
        <input type="text" placeholder='Your email' name="" id="" required/>
        <input type="password" placeholder='Password' name="" id="" required/>
      </div>

      <button className='login-btn'>{currstate==="signup"?"Create Account":"Login"}</button>
      
      <div className="login-poup-condition">
        <input type="checkbox" required/>
        <p>By continuing, i agree to the terms of use & privacy policy</p>
       
        {currstate==="Login"? <p>Create a new account ? <span onClick={()=>setCurrstate("Signup")}>Click here</span></p>: <p>Already have accoun? <span onClick={()=>setCurrstate("Login")}>Login here</span></p>}
       
      </div>
      </form>
    </div>
  )
}

export default LoginPopup;
