import dbConnect from "../../../../utils/dbConnect";
import Product from "../../../../models/Product";

dbConnect();

export default async function (req, res) {
  const {
    method,
    query: { id },
  } = req;
  switch (method) {
    case "GET":
      try {
        const product = await Product.findById(id);

        res.status(200).json(product);
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
