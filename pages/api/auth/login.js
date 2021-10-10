import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Product from "../../../models/Product";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  const { username, password } = req.body;

  switch (method) {
    case "POST":
      let user;
      try {
        user = await User.findOne({ username: username })
          .select("-username -email -isAdmin")
          .populate("isFavorite");

        if (!user) {
          return res.status(400).json({
            success: false,
            message:
              "Something went wrong, please try again with another username.",
          });
        }

        const hashedPassword = await bcrypt.compare(password, user.password);

        if (!hashedPassword) {
          return res.status(401).json({
            message: "Password doesnt match, please try again",
          });
        }

        const token = jwt.sign(
          { isAdmin: user.isAdmin, userId: user._id },
          `${process.env.NEXT_PUBLIC_SECRET_KEY}`,
          { expiresIn: "2d" }
        );
        const { password: psw, ...others } = user._doc;

        res.status(200).json({
          user: others,
          token,
        });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "Something went wrong" });
      }
      break;
    default:
      res.status(400).json({ success: false, message: "Error Server" });
      break;
  }
};
