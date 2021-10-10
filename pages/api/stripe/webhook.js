import { buffer } from "micro";
import dbConnect from "../../../utils/dbConnect";
import apiCall from "../../../store/lib/apiCall";

dbConnect();

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_PR_KEY);

const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_SIGNING_SECRET;

const fullfillOrder = async (session) => {
  const {
    userId,
    productId,
    title,
    desc,
    images,
    categories,
    color,
    size,
    price,
    quantity,
    token,
  } = session.metadata;
  const config = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  const product = {
    id: productId,
    title,
    desc,
    img: images,
    categories,
    size,
    color,
    price,
  };
  const amount = (session.amount_total / 22832).toFixed(2);
  const address =
    session.shipping.name +
    " - " +
    session.shipping.address.city +
    " - " +
    session.shipping.address.line1 +
    " - " +
    session.shipping.address.line2 +
    " - " +
    session.shipping.address.state;
  const response = await apiCall(
    "order/",
    "POST",
    {
      userId,
      product,
      amount,
      quantity,
      address,
    },
    config
  );

  if (response) {
    console.log(`Success : Order ${session.id} had been added to the DB`);
  }

  return response;
};

export default async (req, res) => {
  if (req.method === "POST") {
    const reqBuffer = await buffer(req);
    const payload = reqBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (error) {
      console.log("ERROR", error.message);
      return res.status(400).send(`Webhook error : ${error.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      return fullfillOrder(session)
        .then(() =>
          res.status(200).json({ message: "Success added, will be back..." })
        )
        .catch((err) => res.status(400).send(`Webhook error : ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
