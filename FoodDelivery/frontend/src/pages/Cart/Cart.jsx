
import React, { useContext } from 'react';
import { StoreContext } from '../../components/context/StoreContext';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartitem, food_list, removeFromcart,getTotleCartAmount ,url} = useContext(StoreContext);
 const naveigate = useNavigate();
  return (
    <div className='cart'>
      <div className="cart-container">
        <div className="cart-item">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
  if (cartitem[item._id] > 0) {
    return (
      <React.Fragment key={item._id}> {/* ✅ Added key to Fragment */}
        <div className="cart-title-item">
          <img src={`http://localhost:4000/uploads/${item.image}`} alt="" />
          <p>{item.name}</p>
          <p>{item.price}</p>
          <p>{cartitem[item._id]}</p>
          <p>${item.price * cartitem[item._id]}</p>
          <p className='cross' onClick={() => removeFromcart(item._id)}>x</p>
        </div>
        <hr />
      </React.Fragment>
    );
  }
  return null;
})}
      </div>
      <div className="cart-bottom">
        <div className="cart-totle">
          <h2>Cart Totle</h2>
        <div className="cart-total-details">
          <p>Subtital</p>
          <p>${getTotleCartAmount()===
           0?0:getTotleCartAmount()}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Delivary Free</p>
          <p>${getTotleCartAmount()===
           0?0:2}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <b>Total</b>
          <b>${getTotleCartAmount()===
           0?0:getTotleCartAmount()+2}</b>
        </div>
        <button className='cart-btn' onClick={()=>naveigate('/placeorder')}>PROCESS TO CHECKOUT</button >
        </div>
      <div className="cart-promocode">
        <div><p>If you have a promocode,you hava a enter it here</p>
          <div className="promocode-input">
        <input type="text" name="" placeholder='Promo code' id="" />
        <button>Submit</button>
      </div>
      </div>
      </div>
      </div>
     
    </div>
  );
}

export default Cart;