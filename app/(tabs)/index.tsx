import { Image } from 'expo-image';
import { Platform, StyleSheet ,View,ScrollView, Text,TouchableOpacity, TextInput} from 'react-native';
import React, { useEffect } from 'react';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';

import { ThemedView } from '@/components/themed-view';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchCred } from '@/services/accounts';
import { getCafeData, getCafeHistory, getUserData, getUserHistory } from '@/services/datafetch';
import { getUserRatings, listBadges, submitUserRatings } from '@/services/functionalities';
import OrIsIt from '@/components/OrIsIt';
import RatingCard from '@/components/RatingCard';

export default function HomeScreen() {
  const [nome, setTextInputValue] = React.useState('');
  const [iscafe, setIsCafe] = React.useState(false);
  const [cups, setCups] = React.useState(0);
  const [badge, setBadge] = React.useState('None');
  const [rating, setRating] = React.useState(0);
  const [adress, setAdress] = React.useState('');
  const [badgeNum, setBadgeNum] = React.useState(10);
  const [badgeLeft, setBadgeLeft] = React.useState(0);
  const [userimg, setuimg] = React.useState('');
  const [listInter, setListInter] = React.useState([]);
  const [iD,setId] = React.useState(0);
  const [errmsg, setErrMsg] = React.useState('');
  const [ratingsList, setRatingsList] = React.useState([]);
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
          setListInter(instan.instances)
          console.log("WA")
          console.log(instan)
          async function fetchRatings() {
          const res = await getUserRatings();

          if (res?.response === true) {
            setRatingsList(res.list);
            console.log("EI VOCE")
            console.log(ratingsList)
            console.log("yesa")
          } else {
            console.log("Ratings fetch error:", res);
          }
        }

        fetchRatings();
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
          setListInter(instan.instances)
        }
        
        try
        {
          let badge:any = await listBadges()
          let bl = badge.list
          console.log(bl)
          setBadgeNum(badge.amount_for_next)
          setBadgeLeft(badge.progress_for_next)
          if (bl.length   > 0){
          setBadge(bl[bl.length  -1][1])
          }
        }
        catch
        {
          let badge:any = await listBadges()
          let bl = badge.list
          console.log(bl)
          setBadgeNum(badge.amount_for_next)
          setBadgeLeft(badge.progress_for_next)
          if (bl.length   > 0){
          setBadge(bl[bl.length  -1][1])
          }
        }
          
        
      }
      
    }
    yahoo()
  }, [])

  
  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={!iscafe? styles.header:styles.header2}>
        <Text style={styles.greeting}>Good day,</Text>
        <Text style={styles.name}>{nome} <HelloWave/></Text>

        {!iscafe && <View style={styles.row}>
          <View style={styles.pill}>
            <Text>⭐ {(cups*10)} pts</Text>
          </View>
          <View style={styles.pill}>
            <Text>🌱 {cups} cups saved</Text>
          </View>
        </View>}
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => redirect('/pages/profile')} // change route as needed
        >
          <Image
            source={{ uri: userimg }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        {iscafe &&
        <View style={styles.statsRow}>
            <View style={styles.card2}>
              <Text style={styles.statNumber}>{cups}</Text>
              <Text style={styles.statLabel}>Total Cups</Text>
            </View>
        
            <View style={styles.card2}>
              <Text style={[styles.statNumber, { color: "#22c55e" }]}>
                {cups*10}
              </Text>
              <Text style={styles.statLabel}>Total Points</Text>
            </View>
        
            <View style={styles.card2}>
              <Text style={[styles.statNumber, { color: "#facc15" }]}>
                {rating.toFixed(1)}★
              </Text>
              <Text style={styles.statLabel}>Café Rating</Text>
            </View>
          </View>
          }
      </View>

      {/* IMPACT CARD */}
      <View style={styles.card}>
        <Text>Your impact so far:</Text>
        <Text style={styles.bold}>
          You have prevented {cups} disposable cups
        </Text>
      </View>

      {/* QUICK ACTIONS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.actionBox} onPress={() =>
        {
           if(!iscafe) redirect2('/pages/qrcoderender',iD,nome)
            else
           {
          redirect('/pages/qrcodescanner')
          }
        }
  }>
            <Text>Scan QR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBox} onPress={() => redirect('/pages/badges')}>
            <Text>My Impact</Text>
          </TouchableOpacity>
        {!iscafe &&
          <TouchableOpacity style={styles.actionBox} onPress={() => redirect('/pages/nearbycafes')}>
            <Text>Nearby Cafés</Text>
          </TouchableOpacity>}
        </View>
      </View>

      {/* BADGE */}
      <View style={styles.card}>
        <Text style={styles.bold}>{badge}</Text>
        <Text>{badgeLeft} left to next badge</Text>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((badgeNum-badgeLeft) / badgeNum) * 100}%` }]} />
        </View>
      </View>

      {/* STATS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Stats</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{cups}</Text>
            <Text>Total Cups</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{cups}</Text>
            <Text>Cups Saved</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{cups*20} Grams</Text>
            <Text>CO₂ Avoided</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{cups*16} Ounces</Text>
            <Text>Plastic Saved</Text>
          </View>
        </View>
      </View>
        {!iscafe && <View style={styles.section}>
  <Text style={styles.sectionTitle}>Rate Your Visits</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {ratingsList.map((item: any) => (
          <RatingCard key={item.id} item={item}/>
        ))}
</ScrollView>
    </View>}
      {/* ACTIVITY */}
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
            <Text style={{ color: 'green' }}>+{item.amount * 10} pts</Text>
          </View>
        ))}
      </View>

    </ScrollView>
  );
}
/*
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6f8',
  },
statNumber: {
    color: "#38bdf8",
    fontSize: 20,
    fontWeight: "bold",
  },

  statLabel: {
    color: "#cbd5e1",
    fontSize: 12,
    textAlign: "center",
  },statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },
  header: {
    backgroundColor: '#2f80ed',
  padding: 20,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  position: 'relative', // important
  },
  header2: {
    backgroundColor: '#18283c',
  padding: 20,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  position: 'relative', // important
  },

  greeting: {
    color: 'white',
    fontSize: 14,
  },

  name: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  ratingCard: {
  width: 250,
  backgroundColor: 'white',
  padding: 15,
  borderRadius: 15,
  marginRight: 15,
},

cardTitle: {
  fontWeight: 'bold',
  marginBottom: 10,
},

starsRow: {
  flexDirection: 'row',
  marginBottom: 10,
},

star: {
  fontSize: 22,
  marginRight: 5,
},

input: {
  backgroundColor: '#f1f1f1',
  padding: 10,
  borderRadius: 10,
  marginBottom: 10,
},

submitButton: {
  backgroundColor: '#2f80ed',
  padding: 10,
  borderRadius: 10,
  alignItems: 'center',
},

submitText: {
  color: 'white',
  fontWeight: 'bold',
},
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },

  pill: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 20,
    marginRight: 10,
  },

  card: {
    backgroundColor: '#e6f4ea',
    margin: 15,
    padding: 15,
    borderRadius: 15,
  },

  bold: {
    fontWeight: 'bold',
  },

  section: {
    marginHorizontal: 15,
    marginTop: 10,
  },

  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },

  actionBox: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginRight: 10,
  },

  progressBar: {
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginTop: 10,
  },
card2: {
    backgroundColor: "#303947",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    width: 100,
  },
  progressFill: {
    height: 8,
    backgroundColor: '#2ecc71',
    borderRadius: 10,
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  statBox: {
    width: '48%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },



  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  profileButton: {
  position: 'absolute',
  top: 20,
  right: 20,
},

profileImage: {
  width: 40,
  height: 40,
  borderRadius: 20,
  borderWidth: 2,
  borderColor: 'white',
},
});
