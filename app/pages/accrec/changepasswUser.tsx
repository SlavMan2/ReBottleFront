import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import React from 'react';

import { editPasswUser } from '@/services/accounts';

export default function ChangePasswUserPage() {
  const [code, setCode] = React.useState('');
  const [email, setMail] = React.useState('');
  const [newpassw, setNewPassw] = React.useState('');
  const [rnewpassw, setRNewPassw] = React.useState('');
  const [errmsg, setErrMsg] = React.useState('');

  const router = useRouter();

  const handlePost = async (
    senha: string,
    code: string,
    routers: any,
    email: string
  ) => {
    let hasn = false;
    let hass = false;
    let hasm = false;

    for (const s of senha) {
      if ('ABCDEFGHIJKLMNOPQRSTUCWXYZ'.includes(s)) {
        hasm = true;
      }

      if ('!@#$%¨&*()§[()]/-+|;:,.'.includes(s)) {
        hass = true;
      }

      if ('1234567890'.includes(s)) {
        hasn = true;
      }
    }

    if (!hasm || !hass || !hasn) {
      setErrMsg(
        'Your password must include at least one capital letter, one number, and one special character'
      );
      return;
    }

    if (senha !== rnewpassw) {
      setErrMsg('Please re-enter the passwords');
      return;
    }

    const handler = await editPasswUser({
      code,
      senha,
      email,
      rnewpassw,
    });

    if (handler.response === true) {
      return routers.replace('/pages/login');
    }

    setErrMsg(handler);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* LOGO */}
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

      {/* CARD */}
      <View style={styles.card}>
        <Text style={styles.title}>Change Password</Text>

        <Text style={styles.smallText}>
          Enter the verification code and create a new password.
        </Text>

        {!!errmsg && <Text style={styles.errorText}>{errmsg}</Text>}

        {/* EMAIL / PHONE */}
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

        {/* CODE */}
        <View style={styles.inputWrapper}>
          <Ionicons name="key-outline" size={19} color="#888" />

          <TextInput
            style={styles.input}
            onChangeText={setCode}
            value={code}
            placeholder="Verification code"
            placeholderTextColor="#9e9e9e"
          />
        </View>

        {/* NEW PASSWORD */}
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={19} color="#888" />

          <TextInput
            style={styles.input}
            onChangeText={setNewPassw}
            value={newpassw}
            placeholder="New password"
            placeholderTextColor="#9e9e9e"
            secureTextEntry
          />
        </View>

        {/* CONFIRM PASSWORD */}
        <View style={styles.inputWrapper}>
          <Ionicons name="shield-checkmark-outline" size={19} color="#888" />

          <TextInput
            style={styles.input}
            onChangeText={setRNewPassw}
            value={rnewpassw}
            placeholder="Confirm password"
            placeholderTextColor="#9e9e9e"
            secureTextEntry
          />
        </View>

        {/* SAVE */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            handlePost(newpassw, code, router, email)
          }
        >
          <Ionicons name="checkmark-outline" size={20} color="#fff" />

          <Text style={styles.primaryButtonText}>
            Save New Password
          </Text>
        </TouchableOpacity>

        {/* BACK */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.replace('/pages/login')}
        >
          <Ionicons name="arrow-back-outline" size={19} color="#444" />

          <Text style={styles.secondaryButtonText}>
            Back to Login
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
    shadowOffset: {
      width: 0,
      height: 4,
    },
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
    lineHeight: 20,
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