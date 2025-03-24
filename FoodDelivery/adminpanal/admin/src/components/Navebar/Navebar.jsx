import React from 'react'
import {assets} from '../../assets/assets'
import './Navebar.css';
function Navebar() {
  return (
    <div className='navebar' id='nave-bar' >
      <img className='logo' src={assets.logo} alt="" />
      <img className='profile' src={assets.profile_image} alt="" />
    </div>
  )
}

export default Navebar
