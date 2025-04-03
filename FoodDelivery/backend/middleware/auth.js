import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    // ✅ Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Access Denied: No token provided" });
    }

    // ✅ Remove "Bearer " and get the actual token
    const token = authHeader.split(" ")[1];

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // ✅ Attach user ID to request object
    req.user = { _id: decoded._id }; 

    next(); // ✅ Proceed to the next middleware
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authMiddleware;




// const authMiddleware=  (req, res, next) => {
//   try {
//     console.log("Authorization Header:", req.headers.authorization);

//     const token = req.headers;

//     if (!token) {
//       return res.status(401).json({ success: false, message: "Access denied. No token provided." });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         console.error("Token verification error:", err);
//         return res.status(403).json({ success: false, message: "Invalid or expired token." });
//       }

//       req.user = decoded;
//       next();
//     });

//   } catch (error) {
//     console.error("Auth middleware error:", error);
//     res.status(500).json({ success: false, message: "Authentication failed." });
//   }
// };
// export default authMiddleware;