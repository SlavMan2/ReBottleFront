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
    const [listInter, setListInter] = React.useState([]);
    const [id,setId] = React.useState(0);
      const [badge, setBadge] = React.useState('None');
      const [rating, setRating] = React.useState(0);
      const [adress, setAdress] = React.useState('');
      const [userimg, setuimg] = React.useState('');
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
          if (response[3] == "false")
          {
            console.log("A")
              setIsCafe(false)
              let id = response[2]
              setId(id)
            let udata = await getUserData({id})
            console.log(udata)
            setTextInputValue(udata.name)
          
            setuimg(udata.image)
            let instan:any = await getUserHistory()
            setListInter(instan.instances)
            console.log(instan)
          } else 
          {
            setIsCafe(true)
            let id = response[2]
            setId(id)
            let udata:any = await getCafeData({id})
            setTextInputValue(udata.name)
            
            setuimg(udata.image)
            setRating(Number(udata.rating || 0))
            setAdress(udata.adress)
            let instan:any = await getCafeHistory()
            setListInter(instan.instances)
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
        <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Activity</Text>
        
                {listInter?.map((item:any, i:number) => (
                          <View key={i} style={styles.activityRow}>
                            <Image
                            source={{ uri: item.image }}
                            style={styles.profileImage}
                          />
                           <Text>{item.date}</Text>
                            <Text>{item.cname}</Text>
                            <Text style={{ color: 'green' }}>+{item.amount} pts</Text>
                          </View>
                        ))}
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    marginHorizontal: 15,
    marginTop: 10,
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
  },
profileImage: {
  width: 40,
  height: 40,
  borderRadius: 20,
  borderWidth: 2,
  borderColor: 'white',
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
