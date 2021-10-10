import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import verifyToken from "../../../utils/verifyToken";

dbConnect();

export default verifyToken(handler);

async function handler(req, res) {
  const {
    method,
    query: { id },
    body,
  } = req;
  let existingUser;

  switch (method) {
    case "GET":
      try {
        existingUser = await User.findById(id);
      } catch (error) {
        return res.status(500).json("Something went wrong, please try again");
      }

      if (!existingUser) {
        return res.status(400).json("User not found!");
      }

      if (req.auth.id === id || req.auth.isAdmin) {
        try {
          const user = await User.findById(id).select(
            "-username -email -password -isAdmin -_id"
          );

          res.status(200).json(user);
        } catch (error) {
          res.status(500).json(error);
        }
      } else {
        res.status(403).json("You are not allowed to do");
      }
      break;
    case "PUT":
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 12);
      }

      if (req.auth.id === id || req.auth.isAdmin) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            id,
            {
              $set: req.body,
            },
            { new: true }
          );

          res.status(200).json(updatedUser);
        } catch (error) {
          res.status(500).json(error);
        }
      } else {
        res.status(403).json("You are not allowed to do");
      }
      break;

    case "DELETE":
      try {
        existingUser = await User.findById(id);
      } catch (error) {
        res.status(500).json("Something went wrong, please try again");
      }

      if (!existingUser) {
        return res.status(400).json("User not found!");
      }

      if (req.auth.id === id || req.auth.isAdmin) {
        try {
          await User.findByIdAndDelete(id);

          res.status(200).json("DELETED");
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
