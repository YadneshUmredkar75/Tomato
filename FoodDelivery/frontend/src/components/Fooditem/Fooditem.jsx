import React, { useContext } from 'react';
import './Fooditem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';

function Fooditem({ id, name, price, description, image }) {
  const { cartitem, addToCart, removeFromcart } = useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={`http://localhost:4000/uploads/${image}`} alt="" />
        {!cartitem[id]
          ? <img className='food-item-add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt=''/>
          : <div className='food-item-counter'>
              <img onClick={() => removeFromcart(id)} src={assets.remove_icon_red} alt=''/>
              <p>{cartitem[id]}</p>
              <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt=''/>
            </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-info-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
}

export default Fooditem;