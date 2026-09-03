//This manages communication functions from front to back end
import AsyncStorage from '@react-native-async-storage/async-storage';

//const URL = "https://apirebottle.igrejapp.com.br/"
const DEFMESSAGE = "Server Error, attempt again later";
//const URL = "http://192.168.86.21:5000/"
const URL = "http://192.168.86.21:5000/"
// const URL = "https://44.192.65.155:8443//";



export async function getUserData({id}:{id:string}) {
try {
  let credentials = await AsyncStorage.getItem("tk");
  const response = await fetch(URL + "getuserdata", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tk:credentials,
      }),
    });
console.log("AA")
  console.log(id)
  const data = await response.json();

  if (data["response"] === true) {
    return data;
  } else {
    return data["message"];
  }
} catch (error) {
  console.error("Erro na requisição:", error);
  return DEFMESSAGE;
}
}
export async function getCafeData({id}:{id:string}) {
try {
  let credentials = await AsyncStorage.getItem("tk");
  console.log("AAD")
  const response = await fetch(URL + "getcafedata", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tk:credentials,
      }),
    });
  console.log("AA")
  console.log(id)
  const data = await response.json();

  if (data["response"] === true) {
    return data;
  } else {
    return data["message"];
  }
} catch (error) {
  console.error("Erro na requisição:", error);
  return DEFMESSAGE;
}
}
export async function getUserHistory()  {
  let credentials = await AsyncStorage.getItem("tk");
  try {
    
    const response = await fetch(URL + "getuserhistory", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tk:credentials,
      }),
    });

    const data = await response.json();

    if (data["response"] === true) {
    return data;
  } else {
    return data["message"];
  }
  } catch (error) {
    console.error("Erro na requisição:", error);
    return DEFMESSAGE;
  }
}
export async function getCafeHistory()  {
  let credentials = await AsyncStorage.getItem("tk");
  try {
    const response = await fetch(URL + "getcafehistory", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tk:credentials,
      }),
    });

    const data = await response.json();

    if (data["response"] === true) {
    return data;
  } else {
    return data["message"];
  }
  } catch (error) {
    console.error("Erro na requisição:", error);
    return DEFMESSAGE;
  }
}
export async function getCafeList()  {
  
  try {
    const response = await fetch(URL + "getcafelist");

    const data = await response.json();
    if (data.response == true){
      return data
    } else return data.message
    
  } catch (error) {
    console.error("Erro na requisição:", error);
    return DEFMESSAGE;
  }
}