import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView
} from "react-native";
import { CameraView, Camera } from "expo-camera";
import { fetchCred } from "@/services/accounts";
import { router, useRouter } from "expo-router";
import { getCafeData, getCafeList } from "@/services/datafetch";
import { scanUser } from "@/services/functionalities";
import OrIsIt from "@/components/OrIsIt";
import CafeCard from "@/components/CafeCard";

const { width } = Dimensions.get("window");

export default function App() {
  const [errmsg, setErrMsg] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();
  
    let redirect = (route:any) => {
    router.push(route);
  }
  let redirect2 = (route:any,id:any,name:any) => {
    router.push({pathname:route,params:{ uid: id,name:name }});
  }

  useEffect(() => {
    const getIsCafe = async () => {
    let response:any = await fetchCred() as any
      if(response[0] == false){
        redirect('/pages/login')
      } 
      if (response[3] == "1"){
        redirect('/')
      }
      const id = response[2]
      let udata:any = await getCafeList()
      // Let it be written that Luiz Guilherme LOVES his wife
      try{
        if (udata.response == true){
          setData(udata.list)
          //each item in the list is formated in this way
          // "cafe_name":i.name,
           // "id":i.id,
           // "rating":i.rating,
           // "promotion":i.promotion,
           // "adress":i.adress,
           // "image":getCafeImg(i.id),
           // "desc":i.desc
           console.log(udata)
            console.log("LIFE IS CALLING ME")
        } else
        {
          setErrMsg(udata)
           console.log("udata")
          console.log(udata)
        }
      } catch {
        setErrMsg(udata)
      }

                
    }
    
    getIsCafe()
  

    // TODO: fetch dashboard data here
  }, []);
  const filteredData = data.filter((item) =>
  (item.cafe_name||"").toLowerCase().includes(search.toLowerCase()) ||
  (item.adress||"").toLowerCase().includes(search.toLowerCase()) ||
  (item.desc||"").toLowerCase().includes(search.toLowerCase())
  );
  return (
    <ScrollView>
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Cafés ☕</Text>
      <Text style={styles.headerSubtitle}>
        Partner cafés near you
      </Text>
    </View>

    <OrIsIt text={errmsg} />
    <TextInput
  style={styles.searchInput}
  placeholder="Search cafés..."
  value={search}
  onChangeText={setSearch}
/>
    {filteredData &&
      filteredData.map((item: any, index: number) => (
        <CafeCard
          key={index}
          cafe_name={item.cafe_name}
          adress={item.adress}
          rating={Number(item.rating||0).toFixed(1)}
          desc={item.desc}
          promotion={item.promotion}
          image={item.image}
          ratings={item.ratings}
          onPress={() =>
            console.log(item.rating)
          }
        />
      ))}
  </View>
  </ScrollView>
);
}

const BOX_SIZE = width * 0.6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingTop: 50,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#cbd5f5",
    fontSize: 12,
  },

  signOut: {
    backgroundColor: "#334155",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
  },

  card: {
    backgroundColor: "#303947",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    width: 100,
  },
header: {
  paddingHorizontal: 20,
  marginBottom: 20,
},

headerTitle: {
  fontSize: 30,
  fontWeight: "800",
  color: "#111827",
},

headerSubtitle: {
  marginTop: 4,
  color: "#6b7280",
  fontSize: 14,
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
  },

  scanContainer: {
    marginTop: 30,
    alignItems: "center",
  },

  scanTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
  },

  scannerBox: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  headerTop: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},
searchInput: {
  backgroundColor: "#fff",
  marginHorizontal: 20,
  marginBottom: 20,
  paddingHorizontal: 15,
  paddingVertical: 12,
  borderRadius: 12,
  fontSize: 16,
  borderWidth: 1,
  borderColor: "#e5e7eb",
},
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },

  cornerTopLeft: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#38bdf8",
  },

  cornerTopRight: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#38bdf8",
  },

  cornerBottomLeft: {
    position: "absolute",
    bottom: 10,
    left: 10,
    width: 30,
    height: 30,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#38bdf8",
  },

  cornerBottomRight: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 30,
    height: 30,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: "#38bdf8",
  },

  scanText: {
    marginTop: 15,
    fontWeight: "500",
  },

  scanSubText: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 5,
    paddingHorizontal: 30,
  },

  rescanBtn: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#1e293b",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
});