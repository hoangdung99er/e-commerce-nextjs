import dbConnect from "../../../../utils/dbConnect";
import Product from "../../../../models/Product";
import User from "../../../../models/User";
import verifyToken from "../../../../utils/verifyToken";
import mongoose from "mongoose";

dbConnect();

export default verifyToken(handler);

async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "PUT":
      let product;
      let user;
      let updatedUser;
      let indexProduct;
      if (req.auth) {
        try {
          product = await Product.findById(id);
        } catch (error) {
          return res
            .status(500)
            .json(
              "Something went wrong while finding product, please try again"
            );
        }

        try {
          user = await User.findById(req.auth.id);
        } catch (error) {
          return res
            .status(500)
            .json("Something went wrong while finding user, please try again");
        }

        indexProduct = user?.isFavorite?.findIndex(
          (pid) => pid.toString() === id.toString()
        );

        if (indexProduct === -1) {
          user.isFavorite.push(id);
        } else {
          user.isFavorite = user?.isFavorite?.filter(
            (pid) => pid.toString() !== id.toString()
          );
        }

        try {
          updatedUser = await User.findByIdAndUpdate(
            req.auth.id,
            {
              $set: user,
            },
            {
              new: true,
            }
          )
            .select("-username -email -password -isAdmin -_id -isCart")
            .populate("isFavorite");
        } catch (error) {
          return res.status(500).json("Cannot update user");
        }
      } else {
        return res.status(403).json("You are not allowed to do!");
      }
      return res.status(200).json(updatedUser);

      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
