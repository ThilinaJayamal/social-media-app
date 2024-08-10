import { View, Text, Image, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';

const AddPost = () => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<undefined | string>(undefined);

  useEffect(() => {
    if(!image){
      pickImage();
    }
  }, [image])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className='p-3 items-center flex-1 justify-between'>

      <View className='w-full items-center'>
        <Image source={{ uri:image }} className='w-52 aspect-[3/4] rounded-xl bg-slate-300' />
        <Text className='text-blue-500 font-semibold m-5' onPress={pickImage}>Change</Text>
        <TextInput placeholder="What's in your mind" className='w-full p-3' value={caption} onChangeText={(newCaption) => setCaption(newCaption)} />
      </View>

      <View className='w-full'>
        <Pressable className='w-full p-3 bg-blue-500 rounded-md items-center'>
          <Text className='text-white font-semibold'>Share</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default AddPost