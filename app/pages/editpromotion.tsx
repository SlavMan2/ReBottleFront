import { Image } from 'expo-image';
import { Platform, TextInput,StyleSheet ,View,ScrollView,Switch, Text,TouchableOpacity} from 'react-native';
import React, { useEffect } from 'react';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';

import { ThemedView } from '@/components/themed-view';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchCred, logOut, updateCafe, updateUser } from '@/services/accounts';
import { getCafeData, getCafeHistory, getUserData, getUserHistory } from '@/services/datafetch';
import { editCafeThreshold, getCafeThreshold, listBadges } from '@/services/functionalities';
import OrIsIt from '@/components/OrIsIt';
import ImagePickerButton from '@/components/ImagePickerButton';

export default function HomeScreen() {
  
  const [id,setId] = React.useState(0);
  const [badge, setBadge] = React.useState('None');
   const [rating, setRating] = React.useState(0);
  const [adress, setAdress] = React.useState('');
  const [userimg, setuimg] = React.useState('');
  const [nomes, setNomes] = React.useState('');
  const [oldpromotion, setOldPromotion] = React.useState('');
  const [olddesc, setOldDesc] = React.useState('');
  
  const [errmsg, setErrMsg] = React.useState('');
  const [iscafe, setIsCafe] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [cup_amount, setCupAmount] = React.useState('0');
  const [ispercentage, setIsPercentage] = React.useState(false);
  const [value, setValue] = React.useState('0');
  const [message, setMessage] = React.useState('');

  const router = useRouter();
  let redirect = (route:any) => {
    router.push(route);
  }
  let redirect2 = (route:any,id:any,name:any) => {
    router.push({pathname:route,params:{ uid: id,name:name }});
  }
  const handleSave = async () => {
    setLoading(true);
    let res;
    if (iscafe == false){
      redirect('/pages/settings')
    } else {
      res = await editCafeThreshold({
        cup_amount,
        ispercentage,
        value,
        message
      });
      console.log(res)
      console.log("RARA")
    }
    setLoading(false);
    console.log(res)
    if (res.response === true) {
      redirect('/'); // go back to profile
    } else {
      setErrMsg(res.message)
      console.log(res);
    }
  };
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
          redirect('/pages/settings')
        } else 
        {
          setIsCafe(true)
          let id = response[2]
          setId(id)
          let udata:any = await getCafeData({id})
          setNomes(udata.name)
          setOldDesc(udata.desc)
          setOldPromotion(udata.promotion)
          setuimg(udata.image)
          setRating(Number(udata.rating || 0))
          setAdress(udata.adress)
          
          let udata2:any = await getCafeThreshold()
          setCupAmount(udata2.cup_amount)
          setIsPercentage(udata2.is_percentage)
          setMessage(udata2.message)
          setValue(udata2.value)          
          //
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

    <Text style={styles.name}>{nomes}</Text>

    {!iscafe ? (
      <Text style={styles.location}>User</Text>
    ) : (
      <>
        <Text style={styles.location}>📍 {adress}</Text>
        <Text style={styles.location}>⭐ {rating.toFixed(1)}</Text>
        <Text style={styles.location}>Description: {olddesc}</Text>
        <Text style={styles.location}>🎁 {oldpromotion}</Text>
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

  <OrIsIt text={errmsg}/>
  {/* MENU */}
  <View style={styles.form}>
        
        <Text style={styles.label}>Value</Text>
        <TextInput
          style={styles.input}
          value={(value||'0').toString()}
          onChangeText={setValue}
          placeholder="Enter value"
          keyboardType="decimal-pad"
        />
        
        <Text style={styles.label}>Message</Text>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Enter value"
        />

        <Text style={styles.label}>Cup Amount</Text>
        <TextInput
          style={styles.input}
          value={(cup_amount||'0').toString()}
          onChangeText={setCupAmount}
          placeholder="Enter value"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Use Percentage</Text>
        <Switch
          value={ispercentage}
          onValueChange={setIsPercentage}
        />
      </View>

      {/* SAVE BUTTON */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Text>
      </TouchableOpacity>


</ScrollView>
  );
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  saveButton: {
    backgroundColor: '#2f80ed',
    margin: 20,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },

  saveText: {
    color: 'white',
    fontWeight: 'bold',
  },
  form: {
    margin: 20,
  },

  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
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
