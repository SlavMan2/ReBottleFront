import { Image } from 'expo-image';
import { Platform, TextInput,StyleSheet ,View,ScrollView, Text,TouchableOpacity} from 'react-native';
import React, { useEffect } from 'react';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';

import { ThemedView } from '@/components/themed-view';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchCred, logOut, updateCafe, updateUser } from '@/services/accounts';
import { getCafeData, getCafeHistory, getUserData, getUserHistory } from '@/services/datafetch';
import { listBadges } from '@/services/functionalities';
import OrIsIt from '@/components/OrIsIt';
import ImagePickerButton from '@/components/ImagePickerButton';

export default function HomeScreen() {
  
      
  const [listInter, setListInter] = React.useState([]);
  const [id,setId] = React.useState(0);
  const [badge, setBadge] = React.useState('None');
   const [rating, setRating] = React.useState(0);
  const [adress, setAdress] = React.useState('');
  const [adressnew, setAdressNew] = React.useState('');
  const [userimg, setuimg] = React.useState('');
  const [userimgnew, setuimgNew] = React.useState('');
  const [nomes, setNomes] = React.useState('');
  const [nomenew, setNomeNew] = React.useState('');
  const [descnew, setDescNew] = React.useState('');
  const [promotionnew, setPromotionNew] = React.useState('');
  const [oldpromotion, setOldPromotion] = React.useState('');
  const [olddesc, setOldDesc] = React.useState('');
  
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [errmsg, setErrMsg] = React.useState('');
  const [iscafe, setIsCafe] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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
      const nome = nomenew
      const image = userimgnew;
      res = await updateUser({
        nome,
        email,
        phone,
        image,
      });
    } else {
      const adress = adressnew;
      const promotion = promotionnew;
      const desc = descnew;
      const nome = nomenew
      const image = userimgnew;
      res = await updateCafe({
        adress,
        promotion,
        desc,
        nome,
        email,
        phone,
        image,
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
        if (response[3] == '0')
        {
          console.log("A")
                        setIsCafe(false)
                        let id = response[2]
                        setId(id)
                      let udata = await getUserData({id})
                      console.log(udata)
                      setNomes(udata.name)
                    
                      setuimg(udata.image)
          //
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
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={nomenew}
          onChangeText={setNomeNew}
          placeholder="Enter your name"
        />
        {iscafe && <Text style={styles.label}>Adress</Text>}
        {iscafe && 
        <TextInput
          style={styles.input}
          value={adressnew}
          onChangeText={setAdressNew}
          placeholder="Enter your cafe's adress"
        />}
        {iscafe && <Text style={styles.label}>Promotion</Text>}
        {iscafe && 
        <TextInput
          style={styles.input}
          value={promotionnew}
          onChangeText={setPromotionNew}
          placeholder="Type your cafe's promotion"
        />}
        {iscafe && <Text style={styles.label}>Short Description</Text>}
        {iscafe && 
        <TextInput
          style={styles.input}
          value={descnew}
          onChangeText={setDescNew}
          placeholder="Enter your cafe's short description"
        />}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone"
          keyboardType="phone-pad"
        />
        <ImagePickerButton imagetopost={userimgnew} setImageToPost={setuimgNew}/>
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
