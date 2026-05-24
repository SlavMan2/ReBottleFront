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

import { Dropdown } from 'react-native-element-dropdown';

import {
  registerUserPhone,
} from '@/services/accounts';

const data = [
  {
    label: 'Verizon',
    value: 'verizon',
  },
  {
    label:
      'Other (No Password recovery implemented)',
    value: 'other',
  },
];

export default function RegisterUserPhone() {
  const [nome, setTextInputValue] =
    React.useState('');

  const [senha, setSenha] =
    React.useState('');

  const [otpassw, setOtPassw] =
    React.useState('');

  const [image, setImage] =
    React.useState(
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAB1CAYAAACbMxW/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAMHSURBVHhe7d0xbhtBEETRES/i0Pc/go+hUA59CNuBQIAaLYkld7qqurZeyITT/XdEwoblt1+///wbYecyvxAeEtZUwppKWFMJayphTSWsqYQ1lbCmEtZUwppKWFMJayphTSWsqTfHv4+9fLzPL33z98fP+SUr7cPuibiXU+yWYVfGvKd75FZhEUG3dIzc4svT5eOdFnUQH6gjpG+s4kK73F7JsIpBZ+qB5X4Ud4g6GpxTKqz6smbK55UJq7ykR1TPLRFWdTl7sb+1b6GHVVvIEUqzUMMqLcINLaxrVJW5KGFVhq+iMB88rMLQCOw54WHPhBkXGpY56NnAwp41KmtuWNjAgoRlPbUqGPNDwgZeeVjG06oIvYfysMGRsEDIW1saFjlIfFUaNngS1lRZ2PwY3obaS1nY4EpYUwlrKmFNlYRFfUHoCrGfkrDBl7CmEtZUwppKWFMJayphTSWsqYQ1VRJW/RdvsCH2UxI2+BLWVMKaSlhTZWERXxA6Qu2lLGxwJayphDVVGhb1edIFch+lYYOnPCzyKVWG3kN52OCAhEU/rWoY80PCBh4sLOOpVcCaGxY2sKBhWU8vC3NeaNhBHhaJPSc87BAYuprCfJSwQ2T4Cipz0cJGLWpYlad7FaV5ZP5vO8Q/Bq6iFPSKemNvKS5nD9Vzy4Qdwku6R/m8UmGH+LJuqZ9T5jP2i+LnrnrQK+mwVwqBuwS9kvtRvIW9VPb7v6LFjZ0hbnDHmLdahr21MnL3mLdahl0Zc+YSt03Yypj3dI4sHZYR85FOoeXCqsXc0iGwTNgOQWfKgelhOwadKQamhXUIOlMKTPmTJ8eoQ2wu6I1VGrwa+/bCbuyZog6BectvLHtABYzbW3pjE/UTYw9lYRnDKEPvoyQseogukHtZ+hmLPHh31Z+7y25soj6nel9LwlYf0lXl3g6HrTzcGVTt71DYqkOdTcUeXw5bcZgzW73Pl8KuPkR8WrnXp8OufPP4btV+nwq76k3jsRV7fips4ByNuzvs0TcKrF1hE5XjyN7/A4wRJKAfR1yCAAAAAElFTkSuQmCC'
    );

  const [email, setEmail] =
    React.useState('');

  const [message, setMessage] =
    React.useState('');

  const [carrie, setCarrie] =
    React.useState('');

  const router = useRouter();

  let redirect = (route: any) => {
    router.replace(route);
  };

  async function handleRegister(
    nome: string,
    senha: string,
    phone: string,
    carr: string
  ) {
    let handler = null;

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

    handler = await registerUserPhone({
      nome,
      senha,
      phone,
      otpassw,
      carr,
    });

    if (handler == true) {
      return router.push(
        '/pages/login'
      );
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
          Register using Phone Number
        </Text>

        {!!message && (
          <Text style={styles.errorText}>
            {message}
          </Text>
        )}

        {/* EMAIL REGISTER */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() =>
            redirect(
              '/pages/register/registeruserEmail'
            )
          }
        >
          <Ionicons
            name="mail-outline"
            size={20}
            color="#444"
          />

          <Text
            style={
              styles.secondaryButtonText
            }
          >
            Continue with Email
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

        {/* PHONE */}
        <View style={styles.inputWrapper}>
          <Ionicons
            name="call-outline"
            size={18}
            color="#888"
          />

          <TextInput
            style={styles.input}
            onChangeText={(text) =>
              setEmail(text)
            }
            value={email}
            keyboardType="numeric"
            placeholder="10-digit phone number"
            placeholderTextColor="#9e9e9e"
          />
        </View>

        {/* CARRIER */}
        <View style={styles.dropdownWrapper}>
          <Dropdown
            data={data}
            style={styles.dropdown}
            labelField="label"
            valueField="value"
            placeholder="Select Carrier"
            value={carrie}
            onChange={(item) =>
              setCarrie(item.value)
            }
          />
        </View>

        {/* REGISTER BUTTON */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            handleRegister(
              nome,
              senha,
              email,
              carrie
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

  dropdownWrapper: {
    backgroundColor: '#F3F4F8',
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    paddingHorizontal: 10,
  },

  dropdown: {
    height: 58,
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