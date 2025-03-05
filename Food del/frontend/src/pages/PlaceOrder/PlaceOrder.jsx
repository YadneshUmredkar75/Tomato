import React from 'react'
import './PlaceOrder.css'
import { useContext } from 'react';
import { StoreContext } from '../../components/context/StoreContext';
function PlaceOrder() {
  const {getTotleCartAmount} = useContext(StoreContext);
  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivary Information</p>
        <div className="multi-input">
          <input type="text" id='inp'  placeholder='First name' />
          <input type="text" id='inp'  placeholder='Last name' />
        </div>
        <input type="text" id='inp'  placeholder='Email address'  />
        <input type="text" id='inp'  placeholder='Street' />
        <div className="multi-input">
          <input type="text" id='inp' placeholder=' City' />
          <input type="text" id='inp' placeholder='State'  />
        </div>
        <div className="multi-input">
        <input type="text" id='inp' placeholder='Zip code' />
        <input type="text" id='inp' placeholder='City'  />
        </div>
        <input type="text"  id='inp' placeholder='Phone' />
      </div>
      <div className="place-order-right">
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
        <button className='cart-btn' >PROCESS TO PAYMENT</button >
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
