import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';

import { sendCodeCafe } from '@/services/accounts';

const data = [
  { label: 'Phone', value: 'phone' },
  { label: 'Email', value: 'email' },
];

export default function RequestCodeCafe() {
  const [email, setMail] = React.useState('');
  const [mean, setMean] = React.useState('email');
  const [errmsg, setErrMsg] = React.useState('');

  const router = useRouter();

  const handleReq = async (Ident: string, Mean: string) => {
    const handler = await sendCodeCafe({
      Ident,
      Mean,
    });

    if (handler.response === true) {
      return router.replace('/pages/accrec/changepasswCafe');
    } 

    console.log(handler);
    setErrMsg(handler);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.logoContainer}>
        <View style={styles.logoBox}>
          <Ionicons name="leaf-outline" size={42} color="#fff" />
        </View>

        <Text style={styles.logoText}>
          Re<Text style={styles.logoAccent}>Bottle</Text>
        </Text>

        <Text style={styles.subtitle}>
          Sustainability, rewarded ♻️
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Forgot Password?</Text>

        <Text style={styles.smallText}>
          Café Owner account
        </Text>

        {!!errmsg && <Text style={styles.errorText}>{errmsg}</Text>}

        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={19} color="#888" />

          <TextInput
            style={styles.input}
            onChangeText={setMail}
            value={email}
            placeholder="Email or phone number"
            placeholderTextColor="#9e9e9e"
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.label}>
          Send verification code by
        </Text>

        <View style={styles.methodContainer}>
          {data.map((item) => {
            const selected = mean === item.value;

            return (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.methodButton,
                  selected && styles.methodButtonSelected,
                ]}
                onPress={() => setMean(item.value)}
              >
                <Ionicons
                  name={
                    item.value === 'email'
                      ? 'mail-outline'
                      : 'call-outline'
                  }
                  size={19}
                  color={selected ? '#4EA7FF' : '#777'}
                />

                <Text
                  style={[
                    styles.methodText,
                    selected && styles.methodTextSelected,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => handleReq(email, mean)}
        >
          <Ionicons name="paper-plane-outline" size={19} color="#fff" />

          <Text style={styles.primaryButtonText}>
            Send Verification Code
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.replace('/pages/login/LoginCafe')}
        >
          <Ionicons name="arrow-back-outline" size={19} color="#444" />

          <Text style={styles.secondaryButtonText}>
            Back to Café Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#EEF5F3',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 50,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },

  logoBox: {
    width: 82,
    height: 82,
    borderRadius: 24,
    backgroundColor: '#4EA7FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4EA7FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },

  logoText: {
    marginTop: 14,
    fontSize: 38,
    fontWeight: '800',
    color: '#111',
  },

  logoAccent: {
    color: '#4EA7FF',
  },

  subtitle: {
    fontSize: 15,
    color: '#6b6b6b',
    marginTop: 4,
  },

  card: {
    width: '90%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1a1a1a',
  },

  smallText: {
    textAlign: 'center',
    color: '#8d8d8d',
    marginTop: 8,
    marginBottom: 22,
    fontSize: 14,
  },

  errorText: {
    color: '#ff4b4b',
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 14,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F8',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 58,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E4E4E4',
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#222',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
  },

  methodContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },

  methodButton: {
    flex: 1,
    height: 54,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },

  methodButtonSelected: {
    borderColor: '#4EA7FF',
    backgroundColor: '#F3F8FF',
  },

  methodText: {
    marginLeft: 7,
    fontSize: 15,
    fontWeight: '600',
    color: '#777',
  },

  methodTextSelected: {
    color: '#4EA7FF',
  },

  primaryButton: {
    height: 58,
    borderRadius: 30,
    backgroundColor: '#4EA7FF',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 6,
    shadowColor: '#4EA7FF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },

  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },

  secondaryButton: {
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 14,
    backgroundColor: '#fff',
  },

  secondaryButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
});