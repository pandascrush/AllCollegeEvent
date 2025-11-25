import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
  try {
    // Get token from headers (Authorization: Bearer <token>)
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }

      // Save decoded data to request
      req.user = decoded;

      next();
    });

  } catch (error) {
    res.status(500).json({ message: "Server error in authentication" });
    return next(err)
  }
};    


