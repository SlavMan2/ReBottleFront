import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import { registerUserEmail } from '@/services/accounts';

export default function RegisterUserEmail() {
  const [nome, setTextInputValue] =
    React.useState('');

  const [senha, setSenha] =
    React.useState('');

  const [otpassw, setOtPassw] =
    React.useState('');

  const [email, setEmail] =
    React.useState('');

  const [message, setMessage] =
    React.useState('');

  const router = useRouter();

  let redirect = (route: any) => {
    router.replace(route);
  };

  async function handleRegister(
    nome: string,
    senha: string,
    email: string
  ) {
    let hasn = false;
    let hass = false;
    let hasm = false;

    for (const s of senha) {
      if (
        'ABCDEFGHIJKLMNOPQRSTUCWXYZ'.includes(
          s
        )
      ) {
        hasm = true;
      }

      if (
        '!@#$%¨&*()§[()]/-+|;:.,'.includes(
          s
        )
      ) {
        hass = true;
      }

      if ('1234567890'.includes(s)) {
        hasn = true;
      }
    }

    if (!hasm || !hass || !hasn) {
      setMessage(
        'Your password must include at least one capital letter, one number, and one special character'
      );

      return;
    }

    const handler =
      await registerUserEmail({
        nome,
        senha,
        email,
        otpassw,
      });

    if (handler === true) {
      return router.push('/pages/login');
    } else {
      console.log(handler);
      setMessage(handler);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
      showsVerticalScrollIndicator={
        false
      }
    >
      {/* LOGO */}
      <View style={styles.logoContainer}>
        <View style={styles.logoBox}>
          <Ionicons
            name="leaf-outline"
            size={40}
            color="#fff"
          />
        </View>

        <Text style={styles.logoText}>
          Re
          <Text
            style={{ color: '#4EA7FF' }}
          >
            Bottle
          </Text>
        </Text>

        <Text style={styles.subtitle}>
          Sustainability, rewarded ♻️
        </Text>
      </View>

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.title}>
          Create Account
        </Text>

        <Text style={styles.smallText}>
          Register using Email
        </Text>

        {!!message && (
          <Text style={styles.errorText}>
            {message}
          </Text>
        )}

        {/* PHONE REGISTER */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() =>
            redirect(
              '/pages/register/registeruserPhone'
            )
          }
        >
          <Ionicons
            name="call-outline"
            size={20}
            color="#444"
          />

          <Text
            style={
              styles.secondaryButtonText
            }
          >
            Continue with Phone Number
          </Text>
        </TouchableOpacity>

        {/* USERNAME */}
        <View style={styles.inputWrapper}>
          <Ionicons
            name="person-outline"
            size={18}
            color="#888"
          />

          <TextInput
            style={styles.input}
            onChangeText={(text) =>
              setTextInputValue(text)
            }
            value={nome}
            placeholder="Username"
            placeholderTextColor="#9e9e9e"
          />
        </View>

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
              setEmail(text)
            }
            value={email}
            placeholder="Email Address"
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

        {/* REPEAT PASSWORD */}
        <View style={styles.inputWrapper}>
          <Ionicons
            name="shield-checkmark-outline"
            size={18}
            color="#888"
          />

          <TextInput
            style={styles.input}
            onChangeText={(text) =>
              setOtPassw(text)
            }
            value={otpassw}
            secureTextEntry
            placeholder="Repeat Password"
            placeholderTextColor="#9e9e9e"
          />
        </View>

        {/* REGISTER BUTTON */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            handleRegister(
              nome,
              senha,
              email
            )
          }
        >
          <Ionicons
            name="person-add-outline"
            size={18}
            color="#fff"
          />

          <Text
            style={styles.primaryButtonText}
          >
            Register
          </Text>
        </TouchableOpacity>

        {/* DIVIDER */}
        <View style={styles.dividerContainer}>
          <View style={styles.line} />

          <Text style={styles.orText}>
            or
          </Text>

          <View style={styles.line} />
        </View>

        {/* LOGIN */}
        <TouchableOpacity
          onPress={() =>
            redirect('/pages/login')
          }
        >
          <Text style={styles.backText}>
            Already have an account?
            Login
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
    marginBottom: 18,
    backgroundColor: '#fff',
  },

  secondaryButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },

  backText: {
    textAlign: 'center',
    color: '#4EA7FF',
    marginTop: 14,
    fontSize: 14,
    fontWeight: '600',
  },
});