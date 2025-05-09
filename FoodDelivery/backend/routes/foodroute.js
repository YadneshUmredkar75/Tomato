import express from 'express';
// import { addFood } from '../controllers/foodController.js';
import { addFood,listFood,foodRemove} from '../controllers/foodcontroller.js';
import multer from 'multer';

const foodRouter=express.Router();
// Image storage engine
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
   return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", foodRemove);



export default foodRouter;