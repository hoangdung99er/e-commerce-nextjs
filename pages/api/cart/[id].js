import dbConnect from "../../../utils/dbConnect";
import Cart from "../../../models/Cart";
import verifyToken from "../../../utils/verifyToken";

dbConnect();

export default verifyToken(handler);

async function handler(req, res) {
  const {
    method,
    query: { id, userId },
  } = req;
  switch (method) {
    case "PUT":
      if (req.auth.isAdmin || req.auth.id === userId) {
        try {
          const updatedCart = await Cart.findByIdAndUpdate(
            id,
            {
              $set: req.body,
            },
            { new: true }
          );

          res.status(200).json(updatedCart);
        } catch (error) {
          res.status(500).json(error);
        }
      } else {
        res.status(403).json("You are not allowed to do");
      }
      break;
    case "DELETE":
      if (req.auth.isAdmin || req.auth.id === userId) {
        try {
          await Cart.findByIdAndDelete(id);

          res.status(200).json("Cart has been deleted");
        } catch (error) {
          res.status(500).json(error);
        }
      } else {
        res.status(403).json("You are not allowed to do!");
      }
      break;
    case "GET":
      if (req.auth.isAdmin || req.auth.id === userId) {
        try {
          const cart = await Cart.find({ userId: userId });

          res.status(200).json(cart);
        } catch (error) {
          res.status(500).json(error);
        }
      } else {
        res.status(403).json("You are not allowed to do!");
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
