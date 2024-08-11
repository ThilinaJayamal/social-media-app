import { View, Text, Image, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import Button from '@/src/components/Button';
import { supabase } from '@/src/lib/supabase';

const ProfileScreen = () => {
  const [image, setImage] = useState<undefined | string>(undefined);
  const [username, setUsername] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View className='p-3 flex-1 justify-between'>

      <View>
        <Image source={{ uri: image }} className='w-52 aspect-[1] rounded-full bg-slate-300 self-center' />
        <Text className='text-blue-500 font-semibold m-5 self-center' onPress={pickImage}>Change</Text>

        <Text className='font-semibold text-gray-500 mb-2'>Username</Text>
        <TextInput placeholder="Username" value={username} className='border border-gray-300 p-3 rounded-md' />
      </View>

      <View className='w-full gap-2'>
        <Button title="Update profile" />
        <Button title="Sign out" onPress={()=>supabase.auth.signOut()}/>
      </View>

    </View>
  )
}

export default ProfileScreen