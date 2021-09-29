import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import verifyToken from "../../../utils/verifyToken";

dbConnect();

export default verifyToken(handler);

async function handler(req, res) {
  const { method } = req;
  const query = req.query.new;

  switch (method) {
    case "GET":
      if (req.auth.isAdmin) {
        try {
          const users = query
            ? await User.find({}).sort({ _id: -1 }).limit(5)
            : await User.find({});

          res.status(200).json(users);
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
