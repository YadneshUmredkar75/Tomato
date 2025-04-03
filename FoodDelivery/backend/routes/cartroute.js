import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartcontroller.js";

import  authMiddleware from "../middleware/auth.js";
const cartroute = express.Router();
cartroute.post("/add",authMiddleware,addToCart);
cartroute.post("/remove",authMiddleware,removeFromCart);
cartroute.get("/get",authMiddleware,getCart);
export default cartroute;