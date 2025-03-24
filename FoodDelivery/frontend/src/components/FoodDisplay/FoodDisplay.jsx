import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import './FoodDisplay.css'
import Fooditem from '../Fooditem/Fooditem'
function FoodDisplay({category}) {
  const {food_list} = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h1>Foop dishes near you</h1>
      <div className="food-display-list">
        {food_list.map((items,index)=>{
          if(category==="All" || category===items.category){
            return(<Fooditem  key={index} 
              id={items._id} 
              name={items.name} 
              price={items.price} 
              description={items.description}  // Fixed typo
              image={items.image}  />)
          }
         
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
