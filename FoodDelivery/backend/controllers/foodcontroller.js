import foodmodle from "../model/foodmodel.js";
import fs from "fs";

// Add a food item
const addFood = async (req, res) => {
  const image_filename = `${req.file.filename}`;

  const food = new foodmodle({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// List all food items
const listFood = async (req, res) => {
  try {
    const foods = await foodmodle.find({}).exec(); // Add await here
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Remove a food item
const foodRemove = async (req, res) => {
  try {
    // Find food item by id
    const food = await foodmodle.findById(req.body.id);

    if (!food) {
      return res.json({ success: false, message: "Food item not found" });
    }

    // Remove image
    fs.unlink(`./uploads/${food.image}`, (err) => {
      if (err) console.error("Image deletion error:", err);
    });

    // Delete food item
    await foodmodle.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food removed successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { addFood, listFood, foodRemove };