import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import Exploremenu from '../../components/Explormenu/Exploremenu.jsx'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay.jsx';
import Appdownload from '../../components/Appdownload/Appdownload.jsx';
function Home() {
  const [category,setCategory]=useState("All");
  return (
    <div>
     <Header/>
     <Exploremenu category={category} setCategory={setCategory}/>
     <FoodDisplay category={category} />
     <Appdownload/>
    </div>
  )
}

export default Home
