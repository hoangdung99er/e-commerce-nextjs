import dbConnect from "../../../utils/dbConnect";
import Cart from "../../../models/Cart";
import verifyToken from "../../../utils/verifyToken";

dbConnect();

export default verifyToken(handler);

async function handler(req, res) {
  const {
    method,
    query: { userId },
  } = req;

  switch (method) {
    case "GET":
      if (req.auth.id === userId || req.auth.isAdmin) {
        try {
          const carts = await Cart.find({});

          res.status(200).json(carts);
        } catch (error) {
          res.status(500).json(error);
        }
      } else {
        res.status(403).json("You are not allowed to do");
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
