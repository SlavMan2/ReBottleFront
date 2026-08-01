import CheckoutScreen from '@/components/payment/ptest.native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';

export default function App() {
  const [publishableKey, setPublishableKey] = useState('');

  const fetchPublishableKey = async () => {
    const key = "pk_test_51TqYqLPKZWcZGk69EGA2EdL2VP5yOgyWOhK7zZA1Yc71hp3FZhzacy3nQPgEFL7gK0ASMPOudS2JkuuMMMcZ07Wi00xKYguWDx" // fetch key from your server here
    setPublishableKey(key);
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);
  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <CheckoutScreen/>
    </StripeProvider>
  );
}