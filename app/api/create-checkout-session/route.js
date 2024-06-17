import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        const amount = 1000; // Nilai amount dalam sen (misalnya, 1000 sen = $10)

        const params = {
            submit_type: 'pay',
            payment_method_types: ['card', 'alipay'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: amount,
                        product_data: {
                            name: 'Custom amount donation',
                        },
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${request.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.get('origin')}/result?session_id={CHECKOUT_SESSION_ID}`,
        };

        const checkoutSession = await stripe.checkout.sessions.create(params);
        return Response.json({ 
            sessionId: checkoutSession.id, 
            checkoutUrl: checkoutSession.url 
        }, { status: 200 });
    } catch (error) {
        console.log(error)
        return Response.json({ message: 'Terjadi kesalahan' });
    } finally {
        // await client.close();
    }
}