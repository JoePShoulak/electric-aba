import jwt from "jsonwebtoken"; // Use `import` in ES Module mode

const handleExceptions = async (req, res, next) => {
  try {
    await next();
  } catch (error) {
    res.status(500).json({ message: error.nessage });
  }
};

// Middleware to verify JWT token
const userAuth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Attach user ID to request
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }

  next();
};

export { handleExceptions, userAuth };
