import React from 'react'
import './Exploremenu.css'

import {menu_list} from '../../assets/assets'
const Exploremenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
      <div className="explore-menu-text">
        <p>choose from a divese menu featuring a delecatable array of dishes crafted with the finest ingredients and culiner expertise you dining experience , one delicious meal at a time</p>
      </div>
      <div className="explore-menu-list">
        {menu_list.map((items,index)=>{
          return(<div key={index} onClick={()=>setCategory(prev=>prev===items.menu_name?"All":items.menu_name)} className='explore-menu-item'>
            <img className={category===items.menu_name?"active":""} src={items.menu_image} alt="" />
            <p>{items.menu_name}</p>
          </div>)
        })}
      </div>  
      <hr />
    </div>
  )
}

export default Exploremenu
