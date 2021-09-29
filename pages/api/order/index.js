import dbConnect from "../../../utils/dbConnect";
import Order from "../../../models/Order";
import verifyToken from "../../../utils/verifyToken";

dbConnect();

export default verifyToken(handler);

async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const orders = await Order.find({});
        res.status(200).json(orders);
      } catch (error) {
        res.status(500).json(error);
      }
    case "POST":
      const newOrder = new Order(req.body);

      if (req.auth) {
        try {
          const savedOrder = await newOrder.save();

          res.status(201).json(savedOrder);
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
