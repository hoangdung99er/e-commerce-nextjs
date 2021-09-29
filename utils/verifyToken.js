import jwt from "jsonwebtoken";

export default function verifyToken(handler) {
  return async (req, res) => {
    try {
      const responseToken = req.headers.authorization.split(" ")[1];

      const tokenDecoded = jwt.verify(
        responseToken,
        `${process.env.NEXT_PUBLIC_SECRET_KEY}`
      );

      if (!tokenDecoded) {
        return res.status(403).json("Token is not valid");
      } else {
        req.auth = { id: tokenDecoded.userId, isAdmin: tokenDecoded.isAdmin };
      }

      await handler(req, res);
    } catch (error) {
      console.log(error);
      res.status(400).json("Authorize failed");
    }
  };
}
