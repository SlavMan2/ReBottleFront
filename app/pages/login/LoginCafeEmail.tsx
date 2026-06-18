import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { logCafeEmail } from '@/services/accounts';

export default function LoginCafeEmailPage() {
  const [textInputValue, setTextInputValue] =
    React.useState('');

  const [message, setMessage] =
    React.useState('');

  const [senha, setSenha] =
    React.useState('');

  const router = useRouter();

  async function Logfunc(
    router: any,
    senha: any,
    email: any
  ) {
    let handler = await logCafeEmail({
      email,
      senha,
    });

    console.log(handler);

    if (handler.response == true) {
      try {
        await AsyncStorage.setItem(
          'tk',
          handler.token
        );

        await AsyncStorage.setItem(
          'iscafe',
          '1'
        );

        await AsyncStorage.setItem(
          'id',
          handler.id.toString()
        );
      } catch (e) {}

      return router.replace('/');
    } else {
      console.log(handler);
      setMessage(handler);
    }
  }

  let redirect = (route: any) => {
    router.replace(route);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* LOGO */}
      <View style={styles.logoContainer}>
        <View style={styles.logoBox}>
          <Ionicons
            name="cafe-outline"
            size={42}
            color="#fff"
          />
        </View>

        <Text style={styles.logoText}>
          Re<Text style={{ color: '#4EA7FF' }}>
            Bottle
          </Text>
        </Text>

        <Text style={styles.subtitle}>
          Sustainability, rewarded ☕
        </Text>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.title}>
          Café Login
        </Text>

        <Text style={styles.smallText}>
          Sign in with your café email
        </Text>

        {!!message && (
          <Text style={styles.errorText}>
            {message}
          </Text>
        )}

        {/* EMAIL */}
        <View style={styles.inputWrapper}>
          <Ionicons
            name="mail-outline"
            size={18}
            color="#888"
          />

          <TextInput
            style={styles.input}
            onChangeText={(text) =>
              setTextInputValue(text)
            }
            value={textInputValue}
            placeholder="cafe@email.com"
            placeholderTextColor="#9e9e9e"
            autoCapitalize="none"
          />
        </View>

        {/* PASSWORD */}
        <View style={styles.inputWrapper}>
          <Ionicons
            name="lock-closed-outline"
            size={18}
            color="#888"
          />

          <TextInput
            style={styles.input}
            onChangeText={(text) =>
              setSenha(text)
            }
            value={senha}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#9e9e9e"
          />
        </View>

        {/* LOGIN BUTTON */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            Logfunc(
              router,
              senha,
              textInputValue
            )
          }
        >
          <Ionicons
            name="mail-outline"
            size={18}
            color="#fff"
          />

          <Text style={styles.primaryButtonText}>
            Continue with Email
          </Text>
        </TouchableOpacity>

        {/* DIVIDER */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />

          <Text style={styles.orText}>or</Text>

          <View style={styles.line} />
        </View>

        {/* PHONE LOGIN */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() =>
            redirect('/pages/login/LoginCafe')
          }
        >
          <Ionicons
            name="call-outline"
            size={20}
            color="#444"
          />

          <Text style={styles.secondaryButtonText}>
            Continue with Phone Number
          </Text>
        </TouchableOpacity>

        {/* FORGOT PASSWORD */}
        <TouchableOpacity
          onPress={() =>
            redirect('/pages/accrec/requestcodeCafe')
          }
        >
          <Text style={styles.forgotText}>
            Forgot My Password
          </Text>
        </TouchableOpacity>

        {/* BACK BUTTON */}
        <TouchableOpacity
          onPress={() =>
            redirect('/pages/login/LoginCafe')
          }
        >
          <Text style={styles.backText}>
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
    shadowOffset: {
      width: 0,
      height: 6,
    },
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
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,

    elevation: 6,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1a1a1a',
  },

  smallText: {
    textAlign: 'center',
    color: '#8d8d8d',
    marginTop: 6,
    marginBottom: 22,
    fontSize: 14,
  },

  errorText: {
    color: '#ff4b4b',
    textAlign: 'center',
    marginBottom: 12,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F8',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 58,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E4E4E4',
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#222',
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
    shadowOffset: {
      width: 0,
      height: 5,
    },
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

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E2E2',
  },

  orText: {
    marginHorizontal: 10,
    color: '#999',
    fontSize: 14,
  },

  secondaryButton: {
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 14,
    backgroundColor: '#fff',
  },

  secondaryButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },

  forgotText: {
    textAlign: 'center',
    color: '#6d6d6d',
    marginTop: 20,
    fontSize: 14,
  },

  backText: {
    textAlign: 'center',
    color: '#4EA7FF',
    marginTop: 14,
    fontSize: 14,
    fontWeight: '600',
  },
});