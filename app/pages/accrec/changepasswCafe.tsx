import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, useRouter, useFocusEffect} from 'expo-router';
import { StyleSheet,Text, Image, Platform, Pressable, View } from 'react-native';
import { editPasswCafe, editPasswUser, logUserPhone, sendCodeUser } from '@/services/accounts';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import React, { Component } from 'react';
import { ThemedView } from '@/components/themed-view';
import OrIsIt from '@/components/OrIsIt';
import { ThemedText } from '@/components/themed-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native';
import Button from '@/components/Button';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: 'Phone', value: 'phone' },
  { label: 'Email', value: 'email' },
];

export default function ChangePasswUserPage() {
  const [code, setCode] = React.useState('');
  const [email, setMail] = React.useState('');
  const [newpassw, setNewPassw] = React.useState('');
  const [rnewpassw, setRNewPassw] = React.useState('');
  const [errmsg, setErrMsg] = React.useState('');
  const router = useRouter();
  
  let handlePost = async (senha:string, code:any, routers:any,email:any) =>
  {
    let hasn = false
    let hass = false
    let hasm = false
    for (const s of senha)
      { 
        if ("ABCDEFGHIJKLMNOPQRSTUCWXYZ".includes(s))
          {
            hasm = true
          }
        if ("!@#$%¨&*()§[()]/-+|;:.,".includes(s))
          {
            hass = true
          }
        if ("1234567890".includes(s))
          {
            hasn = true
          }
      }
    if (!hasm || !hass ||!hasn){
      setErrMsg("Your password must include at least one capital letter, one number, and one special character")
      return
    }
    if (senha != rnewpassw)
    {
      setErrMsg("Please re-enter the passwords")
    }
    let handler = await editPasswCafe({code, senha, email,rnewpassw})
    if (handler.response == true ) {
      return routers.replace("/pages/login");
    }
    else {
      setErrMsg(handler)
    }
  }
  let redirect = (route:any) => {
    router.replace(route);
  }
  return (
    <View>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Change Password</ThemedText>
      </ThemedView>
      <OrIsIt text={errmsg}/>
      <ThemedText>Email/Phone Number (Only 10 digit number)</ThemedText>
            <TextInput
            style={{ 
            height: 40, 
            borderColor: 'black', 
            backgroundColor: '#D9D9D9', 
            borderWidth: 1,
            borderRadius : 15,
          }}
            onChangeText={text => setMail(text)}
            value={email}
          placeholder={email}
          />
          <ThemedText>Verification Code</ThemedText>
          <TextInput
            style={{ 
            height: 40, 
            borderColor: 'black', 
            backgroundColor: '#D9D9D9', 
            borderWidth: 1,
            borderRadius : 15,
          }}
            onChangeText={text => setCode(text)}
            value={code}
          placeholder={code}
          />
          <ThemedText>New Password</ThemedText>
          <TextInput
            style={{ 
            height: 40, 
            borderColor: 'black', 
            backgroundColor: '#D9D9D9', 
            borderWidth: 1,
            borderRadius : 15,
          }}
            onChangeText={text => setNewPassw(text)}
            value={newpassw}
          placeholder={newpassw}
          />
          <ThemedText>Password Confirmation</ThemedText>
          <TextInput
            style={{ 
            height: 40, 
            borderColor: 'black', 
            backgroundColor: '#D9D9D9', 
            borderWidth: 1,
            borderRadius : 15,
          }}
            onChangeText={text => setRNewPassw(text)}
            value={rnewpassw}
          placeholder={rnewpassw}
          />
      <Button colort='black' colorback='#8DDFEB' text="Salvar" functionToExecute={()=>handlePost(newpassw,code,router,email)}></Button>
    <Button colort='black' colorback='#8DDFEB' text="voltar" functionToExecute={() => redirect('/pages/LoginCafe')}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  reactLogo:{
    alignSelf: 'center',
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
