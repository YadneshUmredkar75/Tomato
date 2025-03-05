import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import foodRouter from './routes/foodroute.js';
//app config
const app=express();
const port=4000;

//middleware
app.use(cors());
app.use(express.json());

// db connection
connectDB();

// api routes
app.use("/api/food",foodRouter);
app.use("/images",express.static('/uploads'));


app.get("/",(req,res)=>{
 res.send("APIs working")
} )
// mongodb+srv://yadneshumredkar75:<db_password>@cluster0.fbepx.mongodb.net/?
app.listen(port,()=>{
  console.log(`Server is running ${port}`);
})