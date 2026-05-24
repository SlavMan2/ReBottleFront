import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, useRouter, useFocusEffect} from 'expo-router';
import { StyleSheet,Text, Image, Platform, Pressable, View } from 'react-native';
import { logUserPhone, sendCodeCafe, sendCodeUser } from '@/services/accounts';
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

export default function RequestCodeUser() {
  const [email, setMail] = React.useState('');
  const [mean, setMean] = React.useState('');
  const [errmsg, setErrMsg] = React.useState('');
  const router = useRouter();

  
  let handleReq = async (Ident:string,Mean:string) =>
  {
    let handler = await sendCodeCafe({Ident,Mean})
    if (handler.response == true ) {
      return router.replace("/pages/accrec/changepasswCafe");
    }
    else {
      console.log(handler)
      setErrMsg(handler)
      
    }
  }
  let redirect = (route:any) => {
    router.replace(route);
  }
  return (
    <View>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Password Change</ThemedText>
      </ThemedView>
      <OrIsIt text={errmsg}/>
      <ThemedText>Email/Phone Number</ThemedText>
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
        <ThemedText>Method</ThemedText>
        <Dropdown
          data={data}
          style={{ 
            height: 40, 
            borderColor: 'black', 
            backgroundColor: '#D9D9D9', 
            borderWidth: 1,
            borderRadius : 15,
          }}
          labelField="label"
          valueField="value"
          placeholder="Email"
          value={mean}
          onChange={item => setMean(item.value)}
        />
      <Button colort='black' colorback='#8DDFEB' text="Send Code" functionToExecute={()=>handleReq(email,mean)}></Button>
      <Text>{"\n"}</Text>
     <Button colort='black' colorback='#8DDFEB' text="Back" functionToExecute={() => redirect('/pages/login/LoginCafe')}></Button>
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
