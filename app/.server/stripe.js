import Stripe from "stripe";

export let stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession(request) {
  try {
    let formData = await request.formData();
    let priceId = formData.get("priceId");

    if (!priceId) {
      return new Response(JSON.stringify({ error: "Missing priceId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let origin = new URL(request.url).origin;

    let session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/pricing/success`,
      cancel_url: `${origin}/pricing/cancel`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Stripe Error:", err);
    return new Response(JSON.stringify({ error: "Checkout session failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
