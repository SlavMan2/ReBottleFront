import { Image } from 'expo-image';
import { Platform, StyleSheet ,View,ScrollView, Text,TouchableOpacity} from 'react-native';
import React, { useEffect } from 'react';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';

import { ThemedView } from '@/components/themed-view';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchCred, logOut } from '@/services/accounts';
import { getCafeData, getCafeHistory, getUserData, getUserHistory } from '@/services/datafetch';
import { listBadges } from '@/services/functionalities';
import OrIsIt from '@/components/OrIsIt';

export default function HomeScreen() {
  const [nome, setTextInputValue] = React.useState('');
  const [iscafe, setIsCafe] = React.useState(false);
  const [cups, setCups] = React.useState(0);
  const [badge, setBadge] = React.useState('None');
  const [rating, setRating] = React.useState(0);
  const [adress, setAdress] = React.useState('');
  const [userimg, setuimg] = React.useState('');
  const [id,setId] = React.useState(0);
  const [errmsg, setErrMsg] = React.useState('');
  const router = useRouter();
  let redirect = (route:any) => {
    router.push(route);
  }
  let redirect2 = (route:any,id:any,name:any) => {
    router.push({pathname:route,params:{ uid: id,name:name }});
  }

  useEffect(() => {
    async function yahoo()
    {
      let response:any = await fetchCred() as any
      if(response[0] == false){
        redirect('/pages/login')
      } else {
        console.log(response)
        if (response[3] == '0')
        {
          console.log("A")
            setIsCafe(false)
            let id = response[2]
            setId(id)
          let udata = await getUserData({id})
          console.log(udata)
          setTextInputValue(udata.name)
          setCups(udata.cups_saved)
          setuimg(udata.image)
          let instan:any = await getUserHistory()
          console.log(instan)
        } else 
        {
          setIsCafe(true)
          let id = response[2]
          setId(id)
          let udata:any = await getCafeData({id})
          setTextInputValue(udata.name)
          setCups(udata.cups_saved)
          setuimg(udata.image)
          setRating(Number(udata.rating || 0))
          setAdress(udata.adress)
          let instan:any = await getCafeHistory()
        }
        let badge:any = await listBadges()
        let bl = badge.list
        console.log(bl)
        if (bl.length   > 0){
          setBadge(bl[bl.length  -1][1])
        }
        
      }
      
    }
    yahoo()
  }, [])

  
  return (
    <ScrollView style={styles.container}>

  {/* HEADER */}
  <View style={!iscafe? styles.header:styles.header2}>
    <View style={styles.avatarWrapper}>
      {userimg ? (
        <Image source={{ uri: userimg }} style={styles.avatarImage} />
      ) : (
        <Text style={styles.avatarEmoji}>😊</Text>
      )}
    </View>

    <Text style={styles.name}>{nome}</Text>

    {!iscafe ? (
      <Text style={styles.location}>User</Text>
    ) : (
      <>
        <Text style={styles.location}>📍 {adress}</Text>
        <Text style={styles.location}>⭐ {rating.toFixed(1)}</Text>
      </>
    )}

    <View style={styles.badgeRow}>
      <View style={styles.badge}>
        <Text>ID: {id}</Text>
      </View>
      <View style={styles.badge}>
        <Text>{badge}</Text>
      </View>
    </View>
  </View>

  {/* STATS */}
  <View style={styles.statsContainer}>
    <View style={styles.statBox}>
      <Text style={styles.statNumber}>{cups}</Text>
      <Text>Cups Saved</Text>
    </View>

    <View style={styles.statBox}>
      <Text style={styles.statNumber}>{cups * 10}</Text>
      <Text>Points</Text>
    </View>

    <View style={styles.statBox}>
      <Text style={styles.statNumber}>{cups}</Text>
      <Text>Reuses</Text>
    </View>
  </View>

  {/* MENU */}
  <View style={styles.menu}>
    {!iscafe && <TouchableOpacity
      style={styles.menuItem}
      onPress={() =>
        router.push({
          pathname: '/pages/qrcoderender',
          params: { uid: id},
        })
      }
    >
      <Text style={styles.menuText}>My QR Code</Text>
      <Text>{'>'}</Text>
    </TouchableOpacity>}

    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => redirect('/pages/badges')}
    >
      <Text style={styles.menuText}>My Badges</Text>
      <Text>{'>'}</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => redirect('/pages/history')}
    >
      <Text style={styles.menuText}>Scan History</Text>
      <Text>{'>'}</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => redirect('/pages/settings')}
    >
      <Text style={styles.menuText}>Settings</Text>
      <Text>{'>'}</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        logOut();
        router.push('/pages/login')}}
    >
      <Text style={[styles.menuText, { color: 'red' }]}>Sign Out</Text>
      <Text>{'>'}</Text>
    </TouchableOpacity>
  </View>

</ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
  },

  header: {
    backgroundColor: '#2f80ed',
    alignItems: 'center',
    padding: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
header2: {
    backgroundColor: '#18283c',
    alignItems: 'center',
    padding: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  avatarWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },

  avatarImage: {
    width: '100%',
    height: '100%',
  },

  avatarEmoji: {
    fontSize: 32,
  },

  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  location: {
    color: 'white',
    marginTop: 5,
  },

  badgeRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },

  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -25,
    paddingHorizontal: 10,
  },

  statBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    width: '30%',
    elevation: 3,
  },

  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  menu: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 10,
  },

  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },

  menuText: {
    fontSize: 16,
  },
});
