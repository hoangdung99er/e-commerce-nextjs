import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

dbConnect();

export default async function (req, res) {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await User.aggregate([
          {
            $match: { createdAt: { $gte: lastYear } },
          },
          {
            $project: {
              month: { $month: "$createdAt" },
            },
          },
          {
            $group: {
              _id: "$month",
              total: { $sum: 1 },
            },
          },
        ]);

        res.status(200).json(users);
      } catch (error) {
        res.status(500).json(error);
      }

      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
