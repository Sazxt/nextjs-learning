"use client"
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
export function StripePayemnt() {
    async function handleCheckout() {
        const stripe = await stripePromise;
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
        });
        const session = await response.json();
        console.log(session.sessionId)
        await stripe.redirectToCheckout({ sessionId: session.sessionId });
    }
    return (
        <div className='bg-gray-500 rounded-sm p-5 text-white'>
            <h1>Pembayaran Stripe</h1>
            <button onClick={handleCheckout}>Bayar Sekarang</button>
        </div>
    )
}