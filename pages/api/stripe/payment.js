const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_PR_KEY);

export default async function (req, res) {
  const { items } = req.body;

  const transformedItems = items.map(({ product, quantity }) => ({
    price_data: {
      currency: "vnd",
      product_data: {
        name: product.title,
        images: [product.img],
      },
      unit_amount: (product.price * 22832).toFixed(0),
    },
    description: product.desc,
    quantity: quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_HOST}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_HOST}/cart`,
    metadata: {
      images: JSON.stringify(items.map(({ product }) => product.img)),
    },
    shipping_address_collection: {
      allowed_countries: ["VN", "GB", "US", "CA"],
    },
  });

  res.status(200).json({
    id: session.id,
  });
}
