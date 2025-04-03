import userModel from "../model/usermodel.js"; // Import the user model


// const addToCart = async (req, res) => {
// try{const userData =await  userModel.findById(req.body._id);
//     console.log("User Data:", userData);
// const cart = userData.cartitem;
// if(!cart[req.body.itemId]){
//     cart[req.body.itemId] = 1;
// }else{
//     cart[req.body.itemId] += 1;
// }
// await userModel.findByIdAndUpdate(req.body._id, { cartitem: cart });
// res.json({ success: true, message: "Item added to cart" });
// } catch (error) {
//     console.error("Error adding to cart:", error);
//     res.json({ success: false, message: "Error adding to cart" });
//   }

// };

//  const addToCart = async (req, res) => {
//     try {
//       console.log("Received Request Body:", req.body); // Log the request body
  
//       const { userId, itemId } = req.body;
  
//       if (!userId) {
//         return res.status(400).json({ success: false, message: "User ID is required" });
//       }
//       if (!itemId) {
//         return res.status(400).json({ success: false, message: "Item ID is required" });
//       }
  
//       const userData = await User.findById(userId);
//       if (!userData) {
//         return res.status(404).json({ success: false, message: "User not found" });
//       }
  
//       const cart = userData.cart || {}; // Ensure cart is an object
  
//       cart[itemId] = (cart[itemId] || 0) + 1; // Update quantity
  
//       await User.findByIdAndUpdate(userId, { $set: { [`cart.${itemId}`]: cart[itemId] } });
  
//       res.json({ success: true, message: "Item added to cart" });
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       res.status(500).json({ success: false, message: "Error adding to cart" });
//     }
//   };
const addToCart = async (req, res) => {
  try {
    if (!req.body._id || req.body._id.trim() === "") {
      return res.json({ success: false, message: "User ID is required" });
  }
  

      const userData = await userModel.findById(req.body._id);
      console.log("User Data:", userData);

      if (!userData) {
          return res.json({ success: false, message: "User not found" });
      } 

      const cart = userData.cartitem || {}; // ✅ Ensure cart is an object

      if (!cart[req.body.itemId]) {
          cart[req.body.itemId] = 1;
      } else {
          cart[req.body.itemId] += 1;
      }

      await userModel.findByIdAndUpdate(req.body._id, { $set: { cartitem: cart } });

      res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
      console.error("Error adding to cart:", error);
      res.json({ success: false, message: "Error adding to cart" });
  }
};

  
const removeFromCart = async (req, res) => {

}
const getCart = async (req, res) => {

}
export  { addToCart, removeFromCart, getCart };