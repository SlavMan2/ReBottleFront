// CafeCard.tsx

import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Button from "./Button";
import { clearRegistry } from "@/services/functionalities";

interface Props {
  image: string;
  code: string;
  name: string;
  id: any;
  iscafe: boolean;
  value: string;
  message: string;
}

export default function CodeCard({name, id, code, image,iscafe,value,message}: Props) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async () => {

      setLoading(true);
      const res = await clearRegistry({
        id: id,
      });
  
      setLoading(false);
  
      if (res?.response === true) {
        setSubmitted(true);
      } else {
        console.log('Error:', res);
      }
      
    };
  return (
    <View style={styles.activityRow}>
      <Image
      source={{ uri: image }}
      style={styles.profileImage}
      />
      <View
      
      >
        <Text style={styles.text2}>Code: {code}</Text>
        <Text style={styles.text2}>{iscafe && "User name: "}{!iscafe && "Cafe name: "}{name}</Text>
        <Text style={styles.text2}>{message}</Text>
        <Text style={styles.text2}>Discount Value: {value}</Text>
      </View>
      {iscafe && <TouchableOpacity
        style={[
          styles.button,
          (loading || submitted ) && { opacity: 0.5 }
        ]}
        disabled={loading || submitted}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          {submitted ? 'Cleared' : loading ? 'Clearing...' : 'Clear'}
        </Text>
      </TouchableOpacity>}
    </View>
  );
}


const styles = StyleSheet.create({
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
   button: {
    backgroundColor: '#2f80ed',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
profileImage: {
  width: 40,
  height: 40,
  borderRadius: 20,
  borderWidth: 2,
  borderColor: 'white',
},actionBox: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginRight: 10,
  },
  text2: {
    fontSize:12
  },
});
