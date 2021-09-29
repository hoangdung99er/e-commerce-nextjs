import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  const { email, username, password } = req.body;

  switch (method) {
    case "POST":
      try {
        let existingUser;
        existingUser = await User.findOne({
          $or: [{ username: username }, { email: email }],
        });

        if (existingUser) {
          return res.status(403).json({
            message: "Email or Username was existed, please try again",
          });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        if (!hashedPassword) {
          return res.status(400).json({
            message: "Cannot hash password, please try again",
          });
        }

        const newUser = new User({
          username,
          email,
          password: hashedPassword,
        });

        await newUser.save();

        const { password: psw, ...others } = newUser._doc;

        const token = jwt.sign(
          { email: newUser.email, userId: newUser._id },
          `${process.env.NEXT_PUBLIC_SECRET_KEY}`,
          { expiresIn: "2d" }
        );

        res.status(201).json({
          success: true,
          data: others,
          token,
        });
      } catch (error) {
        res.status(500).json({
          message: "Something went wrong, please try again.",
          success: false,
        });
      }

      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
