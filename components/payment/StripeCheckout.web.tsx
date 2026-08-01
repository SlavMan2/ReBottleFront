import CheckoutScreen from '@/components/payment/ptest.web';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51TqYqLPKZWcZGk69EGA2EdL2VP5yOgyWOhK7zZA1Yc71hp3FZhzacy3nQPgEFL7gK0ASMPOudS2JkuuMMMcZ07Wi00xKYguWDx");

export default function App2() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutScreen />
    </Elements>
  );
}