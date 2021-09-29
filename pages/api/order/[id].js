import dbConnect from "../../../utils/dbConnect";
import Order from "../../../models/Order";
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
      if (req.auth.isAdmin) {
        try {
          const updatedOrder = await Order.findByIdAndUpdate(
            id,
            {
              $set: req.body,
            },
            { new: true }
          );

          res.status(200).json(updatedOrder);
        } catch (error) {
          res.status(500).json(error);
        }
      } else {
        res.status(403).json("You are not allowed to do");
      }
      break;
    case "DELETE":
      if (req.auth.isAdmin) {
        try {
          await Order.findByIdAndDelete(id);

          res.status(200).json("Order has been deleted");
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
          const order = await Order.find({ userId: userId });

          res.status(200).json(order);
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
