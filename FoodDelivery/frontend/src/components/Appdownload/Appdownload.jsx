import React from 'react'
import { assets } from '../../assets/assets'
import './Appdownload.css'
function Appdownload() {
  return (
    <div className='app-download'id='app-download'>
      <p>Fir Better Experience Download <br />Tomato App
      </p>
      <div className="app-download-plateforms">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  )
}

export default Appdownload
