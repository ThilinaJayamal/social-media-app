import { View, Text, Image, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import Button from '@/src/components/Button';
import { upload } from 'cloudinary-react-native';
import { cld, uploadImage } from '@/src/lib/cloudinary';
import { UploadApiResponse } from 'cloudinary-react-native/lib/typescript/src/api/upload/model/params/upload-params';
import { supabase } from '@/src/lib/supabase';
import { useAuth } from '@/src/providers/AuthProvider';
import { router } from 'expo-router';

const AddPost = () => {

  const { session } = useAuth();

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<undefined | string>(undefined);

  useEffect(() => {
    if (!image) {
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


  const createPost = async () => {
    if (!image) {
      return
    }
    const resopnse = await uploadImage(image);
    console.log(resopnse?.public_id);

    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          caption: caption,
          image: resopnse.public_id,
          user_id: session?.user.id
        },
      ])
      .select()
    router.push("/(tabs)")
  }

  return (
    <View className='p-3 items-center flex-1 justify-between'>

      <View className='w-full items-center'>
        <Image source={{ uri: image }} className='w-52 aspect-[3/4] rounded-xl bg-slate-300' />
        <Text className='text-blue-500 font-semibold m-5' onPress={pickImage}>Change</Text>
        <TextInput placeholder="What's in your mind" className='w-full p-3' value={caption} onChangeText={(newCaption) => setCaption(newCaption)} />
      </View>

      <View className='w-full'>
        <Button title="share" onPress={createPost} />
      </View>
    </View>
  )
}

export default AddPost