// CafeCard.tsx

import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity,ScrollView } from "react-native";
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
      <View style={styles.imageBlock}>
        <Image
        source={{ uri: image }}
        style={styles.profileImage}
        />
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        style={styles.infoScroll}
        contentContainerStyle={styles.infoContainer}
      >
        {
          // style={styles.text2}
        }
        <Text>Code: {code}</Text>
        <Text>{iscafe && "User name: "}{!iscafe && "Cafe name: "}{name}</Text>
        <Text>{message}</Text>
        <Text>Discount Value: {value}</Text>
      </ScrollView>
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
   button: {
    flex: 0.5,
    backgroundColor: '#2f80ed',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
    imageBlock: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
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
  infoScroll: {
    flex: 1,
  },

  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
