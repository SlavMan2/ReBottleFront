import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, useRouter, useFocusEffect} from 'expo-router';
import { StyleSheet,Text, Image, Platform, Pressable, View } from 'react-native';
import { logUserPhone } from '@/services/accounts';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import React, { Component, useEffect } from 'react';
import { ThemedView } from '@/components/themed-view';
import OrIsIt from '@/components/OrIsIt';
import { ThemedText } from '@/components/themed-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native';
import Button from '@/components/Button';
import QRCode from 'react-native-qrcode-svg';


const sas = (router:any)=>{return router.replace('/pages/register')}
import { useLocalSearchParams } from 'expo-router';
import { getCafeOnboardingLink } from '@/services/functionalities';

export default function QRPage() {
  const { uid,name,smessage } = useLocalSearchParams();
  const [message, setMessage] = React.useState('');
  const [linkmessage, setLinkMessage] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  //const qrValue = `https://apirebottle.igrejapp.com.br/scanuser?id=${uid}`;
  useEffect(() => {
      async function yahoo()
      {
        let resp = await getCafeOnboardingLink();
        if(resp?.response == true){
          setLinkMessage(resp.message)
          setLoading(false)
        } else {
          setLinkMessage("Error")
          setMessage(resp.message)
        }
      }
      yahoo()
    },[])
  console.log("Crux sacra sit mihi lux non draco sit mihi dux vade retro satana nunquam suade mihi vana sunt mala quae libas ipse venena bibas")
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Stripe account onboarding</Text>
      

      <View style={styles.card}>
        <Text style={styles.smessage}>{smessage}</Text>
        {loading ? (
          <Text style={styles.subtitle}>
            Loading
          </Text>) : 
          (
          <Text style={styles.subtitle}>
            {linkmessage}
          </Text>)
        }
        <OrIsIt text={message}/>
  
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.id}>ReBottle ID: {uid}</Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    alignItems: 'center',
    paddingTop: 60,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1c1c1e',
  },

  subtitle: {
    fontSize: 14,
    color: '#6e6e73',
    marginTop: 4,
    marginBottom: 20,
  },

  card: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',

    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },

    // Android shadow
    elevation: 3,
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    color: '#1c1c1e',
  },

  id: {
    fontSize: 13,
    color: '#6e6e73',
    marginTop: 4,
  },
  smessage: {
    fontSize: 15,
    color: '#c8c500',
    marginTop: 4,
  },

  helperBtn: {
    marginTop: 20,
    backgroundColor: '#f2f2f7',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
  },

  helperText: {
    fontSize: 13,
    color: '#6e6e73',
  },
});