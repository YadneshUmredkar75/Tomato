import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

function Add() {
  const url = "http://localhost:4000";
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "", // Corrected field name
    price: "",
    category: "Salad"
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description); // Corrected field name
    formData.append('price', data.price);
    formData.append('category', data.category);
    formData.append('image', image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "", // Corrected field name
          price: "",
          category: "Salad"
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error adding food:", error);
      toast.error("Failed to add food. Please try again.");
    }
  };

  return (
    <div className='add'>
      <form className="flex-call" onSubmit={onSubmitHandler}>
        <div className="add-img flex-call">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input type="file" id="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} hidden />
        </div>
        <div className="add-name flex-call">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type here' />
        </div>
        <div className="add-description flex-call">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6'></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category-price flex-call">
            <p>Product Category</p>
            <select onChange={onChangeHandler} value={data.category} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-call">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder='$20' />
          </div>
        </div>
        <button type='submit' className='add-btn'>Add</button>
      </form>
    </div>
  );
}

export default Add;  