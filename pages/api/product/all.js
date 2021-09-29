import dbConnect from "../../../utils/dbConnect";
import Product from "../../../models/Product";
import verifyToken from "../../../utils/verifyToken";

dbConnect();

export default async function handler(req, res) {
  const { method } = req;
  const qNew = req.query.new;
  const qCategory = req.query.category;
  switch (method) {
    case "GET":
      let products;
      try {
        if (qNew) {
          products = await Product.find().sort({ createdAt: -1 }).limit(5);
        } else if (qCategory) {
          products = await Product.find({ categories: { $in: [qCategory] } });
        } else {
          products = await Product.find({});
        }
        res.status(201).json(products);
      } catch (error) {
        res.status(500).json(error);
      }

      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
