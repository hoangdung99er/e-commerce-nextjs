const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_PK_KEY);

export default async function (req, res) {
  const { items, email } = req.body;

  const transformedItems = items.map((item) => ({
    price_data: {
      currency: "vnd",
      product_data: {
        name: item.title,
        images: [item.img],
      },
      unit_amount: (item.price * 22832).toFixed(0),
    },
    description: item.desc,
    size: item.size,
    color: item.color,
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_HOST}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.img)),
    },
    shipping_address_collection: {
      allowed_countries: ["VN", "GB", "US", "CA"],
    },
  });

  res.status(200).json({
    id: session.id,
  });
}
