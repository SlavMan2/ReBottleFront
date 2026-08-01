import Button from "@/components/Button";
import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput ,View} from "react-native";
import { useStripe,CardElement } from "@stripe/react-stripe-js";

import OrIsIt from "@/components/OrIsIt";
import { useElements } from "@stripe/react-stripe-js";
import { useLocalSearchParams, useRouter } from "expo-router";




export default function CheckoutScreen() {
const URLid = "http://192.168.86.25:5000/"
const [ready, setReady] = useState(true);
const [canpay, setCanPay] = useState(false);
const { uid} = useLocalSearchParams();
const [price, setPrice] = useState(0);
const [errmsg, setErrMsg] = useState('');
const stripe:any = useStripe();
const router = useRouter()
const elements:any  = useElements();
    let redirect = (route:any) => {
        router.push(route);
    }
    async function payment(price:any){
        setReady(false)
        let clientsecret = ""

        let response:any = await fetch(URLid+"createpaymentintent", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Id:uid,
                Price:price
            }),
        });
        const res = await response.json();
        if (res?.cafenotready == true)
        {
            setErrMsg("Error: looks like this cafe does not accept tip payments, please return to the main screen")
            return
        }
        if (res.response == true)
        {
            clientsecret = res.clientSecret
        }
        else    
        {
            setErrMsg(res.message)
            setReady(true)
            return
        }
        
        
        const result = await stripe.confirmCardPayment(
            clientsecret,
            {
                payment_method: {
                    card: elements.getElement(CardElement)!,
                },
            }
        );

        if (result.error) {
            console.log(result.error.message);
            
        } else {
            console.log("Paid!");
            redirect("/")
            setReady(true)
        }
        
    }
  
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Payment</Text>
    <Text style={styles.subtitle}>
      Enter your payment details
    </Text>

    <View style={styles.card}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <OrIsIt text={errmsg} />

        <Text style={styles.label}>Amount</Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="0.00"
          placeholderTextColor="#8e8e93"
          onChangeText={(text) => setPrice(Number(text))}
        />

        <Text style={styles.label}>Card Information</Text>

        <View style={styles.cardInput}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "18px",
                  color: "#000",
                  "::placeholder": {
                    color: "#8e8e93",
                  },
                },
              },
            }}
          />
        </View>

        {ready && (
          <View style={styles.buttonContainer}>
            <Button
              text="Checkout"
              colorback="#000000"
              colort="#ffffff"
              functionToExecute={() => payment(price)}
            />
          </View>
        )}
      </ScrollView>
    </View>
  </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    alignItems: "center",
    paddingTop: 60,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1c1c1e",
  },

  subtitle: {
    fontSize: 14,
    color: "#6e6e73",
    marginTop: 4,
    marginBottom: 20,
  },

  card: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 3,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1c1c1e",
    marginTop: 15,
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#f2f2f7",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1c1c1e",
  },

  cardInput: {
    backgroundColor: "#f2f2f7",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e5ea",
    paddingHorizontal: 12,
    paddingVertical: 16,
    minHeight: 60,
    justifyContent: "center",
    marginTop: 8,
  },

  buttonContainer: {
    marginTop: 25,
  },
});