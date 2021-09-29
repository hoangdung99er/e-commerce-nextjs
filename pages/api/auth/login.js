import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  const { username, password } = req.body;

  switch (method) {
    case "POST":
      try {
        const user = await User.findOne({ username: username });

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

        const { password: psw, ...others } = user._doc;

        const token = jwt.sign(
          { isAdmin: user.isAdmin, userId: user._id },
          `${process.env.NEXT_PUBLIC_SECRET_KEY}`,
          { expiresIn: "2d" }
        );

        res.status(200).json({
          message: "Login successfully",
          user: others,
          token,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
