import { useState } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


type imagePickerProps = {
  imagetopost : string | null;
   setImageToPost: (uri:string)=> void;
  }
export default function ImagePickerButton({imagetopost, setImageToPost}:imagePickerProps) {

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64:true
    });

    console.log(result);

    if (!result.canceled) {
      const asset = result.assets[0];
      const mime = asset.mimeType ?? 'image/jpeg';
      const datauri = `data:${mime};base64,${asset.base64}`;
      //result.assets[0].uri
      setImageToPost(datauri);
      console.log(datauri);
    }
    
  };

  return (
    <View style={styles.container}>
      <Button title="Choose the Image" onPress={pickImage} />
      {imagetopost && <Image source={{ uri: imagetopost }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});