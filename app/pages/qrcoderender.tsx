import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, useRouter, useFocusEffect} from 'expo-router';
import { StyleSheet,Text, Image, Platform, Pressable, View } from 'react-native';
import { logUserPhone } from '@/services/accounts';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import React, { Component } from 'react';
import { ThemedView } from '@/components/themed-view';
import OrIsIt from '@/components/OrIsIt';
import { ThemedText } from '@/components/themed-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native';
import Button from '@/components/Button';
import QRCode from 'react-native-qrcode-svg';


const sas = (router:any)=>{return router.replace('/pages/register')}
import { useLocalSearchParams } from 'expo-router';

export default function QRPage() {
  const { uid,name } = useLocalSearchParams();
  const qrValue = `https://apirebottle.igrejapp.com.br/scanuser?id=${uid}`;
  console.log("Crux sacra sit mihi lux non draco sit mihi dux vade retro satana nunquam suade mihi vana sunt mala quae libas ipse venena bibas")
  return (
    <View style={styles.container}>

      <Text style={styles.title}>QR Code</Text>
      <Text style={styles.subtitle}>
        Show your code or scan a café
      </Text>

      <View style={styles.card}>

        <QRCode value={qrValue} size={180} />

        <Text style={styles.name}>{name}</Text>
        <Text style={styles.id}>ReBottle ID: {uid}</Text>

        <View style={styles.helperBtn}>
          <Text style={styles.helperText}>
            Show this to your café barista
          </Text>
        </View>

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