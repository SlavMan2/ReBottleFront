//This manages communication functions from front to back end
import AsyncStorage from '@react-native-async-storage/async-storage';

const URL = "http://192.168.86.21:5000/"
//const URL = "https://apirebottle.igrejapp.com.br/"
const DEFMESSAGE = "Server Error, attempt again later";
//const URL = "http://192.168.86.33:5000/"
// const URL = "https://44.192.65.155:8443//";

export async function getUserRatings()  {
  let credentials = await AsyncStorage.getItem("tk");
  try {
    const response = await fetch(URL + "rating/fetch", {
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

export async function submitUserRatings({id,desc,rat}:{id:string,desc:string,rat:string})  {
  let credentials = await AsyncStorage.getItem("tk");
  try {
    const response = await fetch(URL + "rating/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tk:credentials,
        Id:id,
        Desc:desc,
        Rating:rat
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

export async function fetchLeaderboardData()  {
  let credentials = await AsyncStorage.getItem("tk");
  try {
    const response = await fetch(URL + "leaderboard", {
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
export async function scanUser({URLid}:{URLid:string})  {
  let credentials = await AsyncStorage.getItem("tk");
  if (!URLid.startsWith(URL)){
      return {"response":false}
    }
  console.log(URLid)
  try {
    const response = await fetch(URLid, {
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
export async function listBadges()  {
  let credentials = await AsyncStorage.getItem("tk");
  try {
    const response = await fetch(URL + "listbbadges", {
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

export async function listBadgesBool()  {
  let credentials = await AsyncStorage.getItem("tk");
  try {
    const response = await fetch(URL + "listbbadges/bool", {
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
export async function getCafeOnboardingLink()  {
  let credentials = await AsyncStorage.getItem("tk");
  try {
    const response = await fetch(URL + "retreivelink", {
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

    return data
  } catch (error) {
    console.error("Erro na requisição:", error);
    return DEFMESSAGE;
  }
}