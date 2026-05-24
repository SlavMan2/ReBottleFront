import React from 'react';
import { ThemedText } from '@/components/themed-text';

export default function OrIsIt({text} : {text: any}) {
    if(text == ""){return(<ThemedText></ThemedText>)}
    else
    {return (
    <ThemedText style={{backgroundColor:"#FFCCCB", alignSelf: 'center'}}>  {text}  </ThemedText>
  );}
  
}