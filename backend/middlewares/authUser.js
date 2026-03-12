/////////////////////////////////////////////////////////

import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    // look for "Authorization: Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({
        success: false,
        message: "Not authorized, login again.",
      });
    }

    // take just the token part
    const token = authHeader.split(" ")[1];
    console.log("Token from header:", token);

    // Check if JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set in environment variables.");
      return res.json({
        success: false,
        message: "Server configuration error.",
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user id for later use
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.log("JWT verification error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;

////////////////////////////////////////////

// import jwt from "jsonwebtoken";

// const authUser = async (req, res, next) => {
//   try {
//     // look for "Authorization: Bearer <token>"
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.json({
//         success: false,
//         message: "Not authorized, login again.",
//       });
//     }

//     // take just the token part
//     const token = authHeader.split(" ")[1];
//     console.log("Token from header:", token);

//     // Check if JWT_SECRET is set
//     if (!process.env.JWT_SECRET) {
//       console.error("JWT_SECRET is not set in environment variables.");
//       return res.json({
//         success: false,
//         message: "Server configuration error.",
//       });
//     }

//     // verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // attach user id for later use
//     req.userId = decoded.id;

//     next();
//   } catch (error) {
//     console.log("JWT verification error:", error.message);
//     res.json({ success: false, message: error.message });
//   }
// };

// export default authUser;
