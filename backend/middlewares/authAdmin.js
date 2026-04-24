import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    // ✅ Check for JWT_SECRET first
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set in environment variables");
      return res
        .status(500)
        .json({ success: false, message: "Server configuration error" });
    }

    let token;

    // ✅ METHOD 1: Check custom header "atoken" (your current implementation)
    const { atoken } = req.headers;

    if (atoken) {
      token = atoken;
    } else {
      // ✅ METHOD 2: Check standard Authorization header with Bearer token
      const authHeader = req.headers.authorization;

      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.slice(7); // Remove "Bearer " prefix
      }
    }

    // If no token found in either location
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No authentication token provided. Please login again.",
      });
    }

    try {
      // Verify and decode JWT
      const token_decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Check if email in token matches admin (optional but recommended)
      const adminEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();

      if (
        adminEmail &&
        token_decoded.email &&
        token_decoded.email.toLowerCase() !== adminEmail
      ) {
        return res.status(403).json({
          success: false,
          message: "Invalid admin token",
        });
      }

      // Attach decoded token to request object
      req.admin = token_decoded;
      next();
    } catch (jwtError) {
      if (jwtError.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token has expired. Please login again.",
        });
      }

      return res.status(401).json({
        success: false,
        message: "Invalid token. Please login again.",
      });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default authAdmin;
