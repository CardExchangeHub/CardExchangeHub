// import React, { useEffect, useState } from 'react';
// import {
//   PaymentElement,
//   LinkAuthenticationElement,
//   useStripe,
//   useElements,
// } from '@stripe/react-stripe-js';

// export default function CheckoutForm(): JSX.Element {
//   const stripe = useStripe();
//   const elements = useElements();

//   const [email, setEmail] = useState<string | null>(null);
//   const [message, setMessage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!stripe) {
//       return;
//     }

//     const clientSecret = new URLSearchParams(window.location.search).get(
//       'payment_intent_client_secret'
//     );

//     if (!clientSecret) {
//       return;
//     }

//     stripe.retrievePaymentIntent(clientSecret).then((response) => {
//       const paymentIntent = response?.paymentIntent;

//       if (!paymentIntent) {
//         setMessage('Something went wrong.');
//         return;
//       }

//       switch (paymentIntent.status) {
//         case 'succeeded':
//           setMessage('Payment succeeded!');
//           break;
//         case 'processing':
//           setMessage('Your payment is processing.');
//           break;
//         case 'requires_payment_method':
//           setMessage('Your payment was not successful, please try again.');
//           break;
//         default:
//           setMessage('Something went wrong.');
//           break;
//       }
//     });
//   }, [stripe]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setIsLoading(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: 'http://localhost:3000',
//       },
//     });

//     if (error?.type === 'card_error' || error?.type === 'validation_error') {
//       setMessage(error.message);
//     } else {
//       setMessage('An unexpected error occurred.');
//     }

//     setIsLoading(false);
//   };

//   const handleEmailChange = (e: StripeLinkAuthenticationElementChangeEvent) => {
//     setEmail(e.target.value);
//   };

//   const paymentElementOptions: StripePaymentElementOptions = {
//     layout: undefined,
//   };

//   return (
//     <form id="payment-form" onSubmit={handleSubmit}>
//       <LinkAuthenticationElement
//         id="link-authentication-element"
//         onChange={handleEmailChange}
//       />
//       <PaymentElement id="payment-element" options={paymentElementOptions} />
//       <button disabled={isLoading || !stripe || !elements} id="submit">
//         <span id="button-text">
//           {isLoading ? <div className="spinner" id="spinner"></div> : 'Pay now'}
//         </span>
//       </button>
//       {message && <div id="payment-message">{message}</div>}
//     </form>
//   );
// }
