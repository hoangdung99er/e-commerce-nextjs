import dbConnect from "../../../utils/dbConnect";
import Product from "../../../models/Product";
import verifyToken from "../../../utils/verifyToken";

dbConnect();

export default verifyToken(handler);

async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "POST":
      const newProduct = new Product(req.body);

      if (req.auth.isAdmin) {
        try {
          const savedProduct = await newProduct.save();

          res.status(201).json(savedProduct);
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
