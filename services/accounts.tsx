//This manages communication functions from front to back end
import AsyncStorage from '@react-native-async-storage/async-storage';

const URL = "http://192.168.86.21:5000/"
const DEFMESSAGE = "Server Error, attempt again later";
//const URL = "http://192.168.86.33:5000/"
// const URL = "https://44.192.65.155:8443//";

//User only
//User only
//User only
export async function registerUserPhone({nome, senha, phone,otpassw,carr}:{nome:string, senha:string, phone:string, otpassw:string,carr:string}) {
try {
  if (otpassw!= senha){
    return "Both Passwords must match";
  }
  const response = await fetch(URL + "register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Username: nome,
      Password: senha,
      Password_Repetition: otpassw,
      Phone_Number: phone,
      Phone_Carrier:carr
    }),
  });

  const data = await response.json();

  if (data["response"] === true) {
    return true;
  } else {
    return data["message"];
  }
} catch (error) {
  console.error("Erro na requisição:", error);
  return DEFMESSAGE;
}
}
export async function registerUserEmail({nome, senha, email, otpassw}:{nome:string, senha:string, email:string, otpassw:string}) {
try {
  if (otpassw!= senha){
    return "Both Passwords must match";
  }
  const response = await fetch(URL + "register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Username: nome,
      Password: senha,
      Password_Repetition: otpassw,
      Email: email,
    }),
  });

  const data = await response.json();

  if (data["response"] === true) {
    return true;
  } else {
    return data["message"];
  }
} catch (error) {
  console.error("Erro na requisição:", error);
  return DEFMESSAGE;
}
}
export async function updateUser({nome, email,phone, image}:{nome:any, email:string,phone:any,image:string})  {
  let credentials = await AsyncStorage.getItem("tk");
  try {
    const response = await fetch(URL + "edit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: nome,
        Email: email,
        Phone_Number : phone,
        User_Img: image,
        tk:credentials
      }),
    });

    const data = await response.json();
    console.log(data)
    if (data[0] === true) {
      return true;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    return DEFMESSAGE;
  }
}
export async function logUserPhone({phone, senha}:{phone:string, senha:string})  {
  

  try {
    const response = await fetch(URL + "login/phone", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Phone_Number: phone,
        Password: senha
      }),
    });

    const data = await response.json();

    if (data["response"] === true) {
      await AsyncStorage.setItem("tk", data['token']);
      await AsyncStorage.setItem("cafe", 'false');
      
      return data;
    } else {
      return data["message"];
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    return DEFMESSAGE;
  }
}
export async function logUserEmail({email, senha}:{email:string, senha:string})  {
  

  try {
    const response = await fetch(URL + "login/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        Password: senha
      }),
    });

    const data = await response.json();

    if (data["response"] === true) {
      await AsyncStorage.setItem("tk", data['token']);
      await AsyncStorage.setItem("cafe", 'false');
      return data;
    } else {
      return data["message"];
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    return DEFMESSAGE;
  }
}
export async function editPasswUser({code, senha, email,rnewpassw}:{code:string, senha:string, email:string,rnewpassw:string})  {
  try {
    if (rnewpassw!= senha){
    return "Both Passwords must match";
  }
  const response = await fetch(URL + "changepassw/user", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Code:code,
      Password:senha,
      Email:email,
      Password_Repetition:rnewpassw
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
export async function sendCodeUser({Ident,Mean}:{Ident:string, Mean:string})  {
  try {
  const response = await fetch(URL + "createcode/user", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Mean:Mean,
      Ident:Ident
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

//Cafe only
//Cafe only
//Cafe only

export async function registerCafePhone({nome,spcode, senha, phone,otpassw,carr}:{nome:string,spcode:string, senha:string, phone:string, otpassw:string,carr:string}) {
try {
  if (otpassw!= senha){
    return "Both Passwords must match";
  }
  const response = await fetch(URL + "register/cafe", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Username: nome,
      Password: senha,
      Password_Repetition: otpassw,
      Special_Code:spcode,
      Phone_Number: phone,
      Phone_Carrier:carr
    }),
  });

  const data = await response.json();

  if (data["response"] === true) {
    return true;
  } else {
    return data["message"];
  }
} catch (error) {
  console.error("Erro na requisição:", error);
  return DEFMESSAGE;
}
}
export async function registerCafeEmail({spcode,nome, senha, email, otpassw}:{spcode:string,nome:string, senha:string, email:string, otpassw:string}) {
try {
  if (otpassw!= senha){
    return "Both Passwords must match";
  }
  const response = await fetch(URL + "register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Username: nome,
      Password: senha,
      Password_Repetition: otpassw,
      Special_Code:spcode,
      Email: email,
    }),
  });

  const data = await response.json();

  if (data["response"] === true) {
    return true;
  } else {
    return data["message"];
  }
} catch (error) {
  console.error("Erro na requisição:", error);
  return DEFMESSAGE;
}
}
export async function updateCafe({adress,promotion,desc,nome, email,phone, image}:{adress:string,promotion:string,desc:string,nome:any, email:string,phone:any,image:string})  {
  let credentials = await AsyncStorage.getItem("tk");
  try {
    const response = await fetch(URL + "edit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: nome,
        Email: email,
        Phone_Number : phone,
        User_Img: image,
        tk:credentials,
        Adress:adress,
        Promotion:promotion,
        Description:desc
      }),
    });

    const data = await response.json();

    if (data[0] === true) {
      return true;
    } else {
      return data;
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    return DEFMESSAGE;
  }
}
export async function logCafePhone({phone, senha}:{phone:string, senha:string})  {
  

  try {
    const response = await fetch(URL + "login/cafe/phone", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Phone_Number: phone,
        Password: senha
      }),
    });

    const data = await response.json();

    if (data["response"] === true) {
      await AsyncStorage.setItem("tk", data['token']);
      await AsyncStorage.setItem("cafe", 'true');
      return data;
    } else {
      return data["message"];
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    return DEFMESSAGE;
  }
}
export async function logCafeEmail({email, senha}:{email:string, senha:string})  {
  

  try {
    const response = await fetch(URL + "login/cafe/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: email,
        Password: senha
      }),
    });

    const data = await response.json();

    if (data["response"] === true) {
      await AsyncStorage.setItem("tk", data['token']);
      await AsyncStorage.setItem("cafe", 'true');
      return data;
    } else {
      return data["message"];
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    return DEFMESSAGE;
  }
}
export async function editPasswCafe({code, senha, email,rnewpassw}:{code:string, senha:string, email:string,rnewpassw:string})  {
  try {
    
    if (rnewpassw!= senha){
    return "Both Passwords must match";
  }
  const response = await fetch(URL + "changepassw/cafe", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code:code,
      passw:senha,
      email:email,
      otpassw:rnewpassw
    }),
  });

  const data = await response.json();

  if (data[0] === true) {
    return true;
  } else {
    return data[0];
  }
} catch (error) {
  console.error("Erro na requisição:", error);
  return DEFMESSAGE;
}
}
export async function sendCodeCafe({Ident,Mean}:{Ident:string, Mean:string})  {
  try {
  const response = await fetch(URL + "createcode/cafe", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Mean:Mean,
      Ident:Ident
    }),
  });

  const data = await response.json();

  if (data["response"] === true) {
      await AsyncStorage.setItem("tk", data['token']);
      return true;
  } else {
      return data["message"];
  }
} catch (error) {
  console.error("Erro na requisição:", error);
  return DEFMESSAGE;
}
}

//Both
//Both
//Both
export async function sessionCheck()  {
  let credentials = await AsyncStorage.getItem("tk");
  try {
  const response = await fetch(URL + "session/check", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tk:credentials
    }),
  });

  const data = await response.json();

  if (data['response'] === true) {
    return true;
  } else {
    return false;
  }
} catch (error) {
  console.error("Erro na requisição:", error);
  return false;
}
}
export async function logOut()  {
  await AsyncStorage.clear();
}

export async function fetchCred()  {
 
  try {
    
    let creds = await AsyncStorage.getItem("tk");
    let uid = await AsyncStorage.getItem("id");
    let iscafe = await AsyncStorage.getItem("iscafe");
    let sesscheck = await sessionCheck()
    if (sesscheck == false)
    {
      return [false];
    }
    return [true,creds,uid,iscafe];
  }
  catch{
    return [false];
  }
  
}