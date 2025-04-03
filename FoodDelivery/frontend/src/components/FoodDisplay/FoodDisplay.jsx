import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import './FoodDisplay.css';
import Fooditem from '../Fooditem/Fooditem';

function FoodDisplay({ category }) {
  const { food_list } = useContext(StoreContext);
  const [filteredFood, setFilteredFood] = useState([]);

  // ✅ Update displayed food list when category changes
  useEffect(() => {
    const filtered = category === "All" 
      ? food_list 
      : food_list.filter((food) => food.category === category);

    setFilteredFood(filtered);
  }, [category, food_list]); // ✅ Runs when `category` or `food_list` updates

  return (
    <div className='food-display' id='food-display'>
      <h1>Food dishes near you</h1>
      <div className="food-display-list">
        {filteredFood.length > 0 ? (
          filteredFood.map((food) => (
            <Fooditem  
              key={food._id} 
              id={food._id} 
              name={food.name} 
              price={food.price} 
              description={food.description}  
              image={food.image}  
            />
          ))
        ) : (
          <p>Loading food items...</p>
        )}
      </div>
    </div>
  );
}

export default FoodDisplay;
