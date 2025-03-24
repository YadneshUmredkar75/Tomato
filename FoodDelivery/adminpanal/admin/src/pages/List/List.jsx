import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

function List() {
  const url = "http://localhost:4000";
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log("API Response:", response.data);
      if (response.data.success && Array.isArray(response.data.data)) {
        if (response.data.data.length === 0) {
          toast.info("No food items found.");
        }
        setList(response.data.data);
      } else {
        toast.error("Invalid data format received from the server");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };
  const removeitem=async(food)=>{
  const response=await axios.post(`${url}/api/food/remove`,{id:food});
  await fetchList();
  if(response.data.success){
    toast.success(response.data.massage)
  }else{
    toast.error("error")
  }
  }

  useEffect(() => {
    fetchList();
  }, []);


  return (
    <div className='list'>
      <h1>All Foods List</h1>
      <div className="list-table">
        <div className="list-table-header">
          <div className="list-table-column">Image</div>
          <div className="list-table-column">Name</div>
          <div className="list-table-column">Category</div>
          <div className="list-table-column">Price</div>
          <div className="list-table-column">Action</div>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-row">
            <div className="list-table-column">
              <img src={`${url}/images/${item.image}`} alt={item.name} className="food-image" />
            </div>
            <div className="list-table-column">{item.name}</div>
            <div className="list-table-column">{item.category}</div>
            <div className="list-table-column">${item.price}</div>
            <div className="list-table-column">
              <button onClick={()=>removeitem(item._id)} className="remove-button">X</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;