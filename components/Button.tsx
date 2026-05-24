import { StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/themed-text';

export default function Button({text, functionToExecute, colorback, colort} : {text: any, functionToExecute:any, colorback:any, colort:any}) {
  return (
    <Pressable style={{
      alignSelf: "center",
      
      backgroundColor: colorback,
      borderRadius : 50,
      padding: window.innerWidth > 1440 ? 5 :
         window.innerWidth > 1024 ? 5 :
         window.innerWidth > 600 ? 5 : 5,
         
      paddingHorizontal: window.innerWidth > 1440 ? 40 :
         window.innerWidth > 1024 ? 40 :
         window.innerWidth > 600 ? 30 : 20,

       // Shadow for iOS
      shadowColor: '#f5f5f5',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      // Shadow for Android
      elevation: 5,

    }}focusable={false}  onPress={functionToExecute}><ThemedText style={{color: colort}}>  {text}  </ThemedText></Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: 'black',
    
  }
});
