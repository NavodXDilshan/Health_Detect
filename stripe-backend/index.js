// index.js
const express = require('express');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY'); // Replace with your Stripe Secret Key
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to create a Stripe Checkout session
app.post('/create-checkout-session', async (req, res) => {
  const { tokenCount, userId } = req.body;

  // Hardcode the token price (since we’re not using Cloud Functions to fetch from Firestore)
  const tokenPrice = 10; // $10 per token (adjust as needed)

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Purchase ${tokenCount} Tokens`,
            },
            unit_amount: tokenPrice * 100, // Price per token in cents
          },
          quantity: tokenCount,
        },
      ],
      mode: 'payment',
      success_url: 'https://your-app.com/success', // Replace with your success URL
      cancel_url: 'https://your-app.com/cancel', // Replace with your cancel URL
      metadata: {
        userId: userId,
        tokenCount: tokenCount.toString(),
      },
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});