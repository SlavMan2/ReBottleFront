import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { CameraView, Camera } from "expo-camera";
import { fetchCred } from "@/services/accounts";
import { router, useRouter } from "expo-router";
import { getCafeData } from "@/services/datafetch";
import { scanUser } from "@/services/functionalities";

const { width } = Dimensions.get("window");

export default function App() {

  
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [name, setName] = useState('');
  const [errmsg, setErrMsg] = useState('');
  const [adress, setAdress] = useState('');
  const [cups, setCups] = useState(0);
  const [rating, setRating] = useState(0);
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
      if (response[3] == "false"){
        redirect('/pages/qrcoderender')
      }
      const id = response[2]
      let udata:any = await getCafeData({id})
      setName(udata.name)
      setCups(udata.cups_saved)
      setRating(Number(udata.rating || 0))
      setAdress(udata.adress)
                
    }
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getIsCafe()
    getCameraPermissions();

    // TODO: fetch dashboard data here
  }, []);

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    const URLid = data;
    const scanfunc = async () => {
      let res = await scanUser({URLid})
      console.log(URLid)
    if (res.response == true){
      setScanned(true);
    }
    else{
      setErrMsg(res.message)
      setScanned(false);
    }
  }
    scanfunc()
    console.log("QR VALUE:", data);

    // Example:
    // redeemCustomer(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
  <View style={styles.headerTop}>
    <View>
      <Text style={styles.title}>Café Owner</Text>
      <Text style={styles.subtitle}>{name}, {adress}· ReBottle Partner</Text>
    </View>

  </View>

  {/* 👇 NOW INSIDE HEADER */}
  <View style={styles.statsRow}>
    <View style={styles.card}>
      <Text style={styles.statNumber}>{cups}</Text>
      <Text style={styles.statLabel}>Total Cups</Text>
    </View>

    <View style={styles.card}>
      <Text style={[styles.statNumber, { color: "#22c55e" }]}>
        {cups*10}
      </Text>
      <Text style={styles.statLabel}>Total Points</Text>
    </View>

    <View style={styles.card}>
      <Text style={[styles.statNumber, { color: "#facc15" }]}>
        {rating.toFixed(1)}★
      </Text>
      <Text style={styles.statLabel}>Café Rating</Text>
    </View>
  </View>
</View>

      

      {/* Scanner Section */}
      <View style={styles.scanContainer}>
        <Text style={styles.scanTitle}>Scan Customer</Text>

        <View style={styles.scannerBox}>
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            style={StyleSheet.absoluteFillObject}
          />

          {/* Overlay corners */}
          <View style={styles.overlay}>
            <View style={styles.cornerTopLeft} />
            <View style={styles.cornerTopRight} />
            <View style={styles.cornerBottomLeft} />
            <View style={styles.cornerBottomRight} />
          </View>
        </View>

        <Text style={styles.scanText}>Scanning customer QR...</Text>
        <Text style={styles.scanSubText}>
          1 scan = +10 points for the customer · 1 cup prevented
        </Text>
      </View>

      {/* Reset scan */}
      {scanned && (
        <TouchableOpacity
          style={styles.rescanBtn}
          onPress={() => setScanned(false)}
        >
          <Text style={{ color: "#fff" }}>Scanned Sucessfully: Click here to scan again</Text>
        </TouchableOpacity>
      )}
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

  header: {
  backgroundColor: "#1e293b",
  paddingTop: 50,
  paddingHorizontal: 20,
  paddingBottom: 20,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
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