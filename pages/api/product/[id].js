import dbConnect from "../../../utils/dbConnect";
import Product from "../../../models/Product";
import verifyToken from "../../../utils/verifyToken";

dbConnect();

export default verifyToken(handler);

async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;
  switch (method) {
    case "PUT":
      if (req.auth.isAdmin) {
        try {
          const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
              $set: req.body,
            },
            { new: true }
          );

          res.status(200).json(updatedProduct);
        } catch (error) {
          res.status(500).json(error);
        }
      } else {
        res.status(403).json("You are not allowed to do!");
      }
      break;
    case "DELETE":
      if (req.auth.isAdmin) {
        try {
          await Product.findByIdAndDelete(id);

          res.status(200).json("Product has been deleted");
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
