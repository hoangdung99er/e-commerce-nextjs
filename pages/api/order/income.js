import dbConnect from "../../../utils/dbConnect";
import Order from "../../../models/Order";
import verifyToken from "../../../utils/verifyToken";

dbConnect();

export default verifyToken(handler);

async function handler(req, res) {
  const { method } = req;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  switch (method) {
    case "GET":
      try {
        const income = await Order.aggregate([
          {
            $match: { createdAt: { $gte: previousMonth } },
          },
          {
            $project: {
              month: { $month: "$createdAt" },
              sales: "$amount",
            },
          },
          {
            $group: {
              _id: "$month",
              total: { $sum: $sales },
            },
          },
        ]);
        res.status(200).json(income);
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
