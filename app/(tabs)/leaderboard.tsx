import { Image } from 'expo-image';
import { Platform, StyleSheet ,View,ScrollView, Text,TouchableOpacity} from 'react-native';
import React, { useEffect } from 'react';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';

import { ThemedView } from '@/components/themed-view';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchCred } from '@/services/accounts';
import { getCafeData, getCafeHistory, getUserData, getUserHistory } from '@/services/datafetch';
import { fetchLeaderboardData, listBadges } from '@/services/functionalities';
import OrIsIt from '@/components/OrIsIt';

export default function HomeScreen() {
  const [nome, setTextInputValue] = React.useState('');
  const [userImg,setUserImg] = React.useState('');
  const [listInter, setListInter] = React.useState([]);
  const [id,setId] = React.useState(0);
  const [inLeaderboard,setInLeaderboard] = React.useState(false);
  const [cupamount,setCupAmount] = React.useState(0);
  const [placement,setPlacement] = React.useState(0);
  const [errmsg, setErrMsg] = React.useState('');
  const [iscafe, setIsCafe] = React.useState('false');
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
        let handler = await fetchLeaderboardData();
        try {

          const formatted = handler.userl.map((u: any) => ({
            id: u.id,
            name: u.name,
            image: u.image,
            cups_saved: u.cups_saved,
          }));

          setListInter(formatted);
          setIsCafe(response[3])
          if (handler.me && handler.me.length >=3) {
            setInLeaderboard(true)
            setCupAmount(handler.me[2]);
            setUserImg(handler.me[1]);
            setTextInputValue(handler.me[0]);
            setPlacement(handler.me[3]);
          }

          setId(response[2]);

        } catch (e) {
          setErrMsg("Error loading leaderboard");
        }
      }
      
    }
    yahoo()
  }, [])
  const top3:any = listInter.slice(0, 3);
  const rest = listInter.slice(3);

  
  return (
     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

  {/* TITLE */}
  <Text style={styles.title}>{iscafe=="true" && <Text>Cafe </Text>}Leaderboard 🏆</Text>

  {/* PODIUM */}
  <View style={styles.podiumRow}>

    {/* 2nd */}
    {top3[1] && (
      <View style={styles.podiumItem}>
        <View style={[styles.avatarCircle, { backgroundColor: '#C0C0C0' }]}>
          <Image source={{ uri: top3[1].image }} style={styles.avatarInner} />
        </View>
        <Text style={styles.podiumName}>{top3[1].name}</Text>
        <View style={styles.podiumCard}>
          <Text style={styles.podiumText}>{top3[1].cups_saved}</Text>
        </View>
      </View>
    )}

    {/* 1st */}
    {top3[0] && (
      <View style={[styles.podiumItem, styles.firstPlace]}>
        <View style={[styles.avatarCircle, { backgroundColor: '#FFD700' }]}>
          <Image source={{ uri: top3[0].image }} style={styles.avatarInner} />
        </View>
        <Text style={[styles.podiumName, { fontWeight: 'bold' }]}>
          {top3[0].name}
        </Text>
        <View style={styles.podiumCardHighlight}>
          <Text style={styles.podiumText}>{top3[0].cups_saved}</Text>
        </View>
      </View>
    )}

    {/* 3rd */}
    {top3[2] && (
      <View style={styles.podiumItem}>
        <View style={[styles.avatarCircle, { backgroundColor: '#CD7F32' }]}>
          <Image source={{ uri: top3[2].image }} style={styles.avatarInner} />
        </View>
        <Text style={styles.podiumName}>{top3[2].name}</Text>
        <View style={styles.podiumCard}>
          <Text style={styles.podiumText}>{top3[2].cups_saved}</Text>
        </View>
      </View>
    )}

  </View>

  {/* LIST */}
  <View style={styles.listContainer}>
    {rest.map((user: any, index: number) => {
      const rank = index + 4;
      const isMe = user.id === id;

      return (
        <TouchableOpacity
          key={index}
          style={[styles.row, isMe && styles.meRow]}
          onPress={() => {/*redirect2('/pages/profile', user.id, user.name)*/ console.log("Done Later :)")}}
        >
          <Text style={styles.rank}>#{rank}</Text>

          <Image source={{ uri: user.image }} style={styles.avatarSmall} />

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{user.name}</Text>
           {/*<Text style={styles.location}>Texas</Text>*/}
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.points}>{user.cups_saved * 10} pts</Text>
            <Text style={styles.sub}>{user.cups_saved} cups</Text>
          </View>
        </TouchableOpacity>
      );
    })}
    <View>
      <Text>{"\n"}</Text>
        {inLeaderboard && 
      
        <TouchableOpacity
            style={styles.row}
            onPress={() => {/*redirect2('/pages/profile', user.id, user.name)*/ console.log("Done Later :)")}}
          >
            <Text style={styles.rank}>#{placement}</Text>

            <Image source={{ uri: userImg }} style={styles.avatarSmall} />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{nome}</Text>
            {/*<Text style={styles.location}>Texas</Text>*/}
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.points}>{cupamount * 10} pts</Text>
              <Text style={styles.sub}>{cupamount} cups</Text>
            </View>
          </TouchableOpacity>
      }
    </View>
    
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
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6f8',
  },

  header: {
    backgroundColor: '#2f80ed',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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

  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
});*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
    paddingTop: 50,
    paddingHorizontal: 15,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1c1c1e',
  },

  subtitle: {
    fontSize: 13,
    color: '#8e8e93',
    marginBottom: 20,
  },

  /* PODIUM */

  podiumRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginBottom: 25,
  },

  podiumItem: {
    alignItems: 'center',
  },

  firstPlace: {
    marginBottom: 20,
  },

  avatarCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  podiumName: {
    marginTop: 6,
    fontSize: 13,
  },

  podiumCard: {
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#f2f2f7',
    minWidth: 60,
    alignItems: 'center',
  },

  podiumCardHighlight: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: '#fff4cc',
    borderWidth: 1,
    borderColor: '#FFD700',
    minWidth: 65,
    alignItems: 'center',
  },

  podiumText: {
    fontWeight: 'bold',
  },

  /* LIST */

  listContainer: {
    marginTop: 10,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 18,
    marginBottom: 10,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },

    elevation: 2,
  },

  meRow: {
    borderWidth: 2,
    borderColor: '#2f80ed',
    backgroundColor: '#eaf3ff',
  },

  rank: {
    width: 35,
    fontWeight: 'bold',
    color: '#555',
  },

  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },

  name: {
    fontWeight: '600',
    fontSize: 14,
  },

  location: {
    fontSize: 12,
    color: '#8e8e93',
  },

  points: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#2f80ed',
  },

  sub: {
    fontSize: 12,
    color: '#8e8e93',
  },
});