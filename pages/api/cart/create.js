import dbConnect from "../../../utils/dbConnect";
import Cart from "../../../models/Cart";
import verifyToken from "../../../utils/verifyToken";

dbConnect();

export default verifyToken(handler);

async function handler(req, res) {
  const {
    method,
    body: { userId, product, quantity },
  } = req;
  switch (method) {
    case "POST":
      console.log(product);
      const newCart = new Cart({
        userId: userId,
        products: [
          {
            product: {
              id: product?.id,
              title: product?.title,
              desc: product?.desc,
              img: product?.img,
              categories: product?.categories,
              size: product?.size,
              color: product?.color,
              price: product?.price,
            },
            quantity: quantity,
          },
        ],
      });

      let cart;

      try {
        cart = await Cart.find({});
      } catch (error) {
        res.status(500).json(error);
      }

      if (req.auth) {
        try {
          const savedCart = await newCart.save();

          res.status(201).json(savedCart);
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
