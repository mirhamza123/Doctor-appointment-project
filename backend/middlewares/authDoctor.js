import jwt from "jsonwebtoken";

////////////////////////////////////////
// const authDoctor = async (req, res, next) => {
//   try {
//     const { dtoken } = req.headers;
//     console.log(dtoken);
//     if (!dtoken) {
//       return res.json({
//         success: false,
//         message: " not authorization login again.",
//       });
//     }
//     // Decode and verify JWT
//     const token_decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
//     req.body.docId = token_decoded.id;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };
////////////////////////////////////////

const authDoctor = async (req, res, next) => {
  try {
    const dtoken = req.headers.dtoken || req.headers.dToken; // ✅ read from headers
    if (!dtoken) {
      return res.json({
        success: false,
        message: "No authorization token, login again.",
      });
    }

    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.docId = decoded.id; // ✅ attach to req, not req.body
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.json({ success: false, message: error.message });
  }
};

export default authDoctor;
