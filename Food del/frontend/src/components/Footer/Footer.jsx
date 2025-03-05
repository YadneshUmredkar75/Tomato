import React from 'react'
import { assets } from '../../assets/assets'
import './Footer.css'
function Footer() {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content" id='footer-content'>
          
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>choose from a divese menu featuring a delecatable array of dishes crafted with the finest ingredients and culiner expertise you dining experience , one delicious meal at a time</p>
          <div className="footer-logo">
          <img src={assets.facebook_icon} alt="" />
          <img src={assets.twitter_icon} alt="" />
          <img src={assets.linkedin_icon} alt="" />
          </div>
          
        </div>
        <div className="footer-content-right">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-center">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+111-3456-3268-567</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
       
      </div>
      <hr />
        <p className="footer-content-coppyright">Coppyright 2025 Tomato.com - All Right Reserved.</p>
      
    </div>
  )
}
export default Footer