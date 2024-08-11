import { View, Text, Image, TextInput, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import Button from '@/src/components/Button';
import { supabase } from '@/src/lib/supabase';
import { useAuth } from '@/src/providers/AuthProvider';
import { cld } from '@/src/lib/cloudinary';
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

const ProfileScreen = () => {

  const [image, setImage] = useState<undefined | string>(undefined);
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  const { session } = useAuth();

  useEffect(() => {

    if (session) {
      getProfile();
    }
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
        //console.log(data.avatar_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }


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

  const myImage = cld.image(avatarUrl).resize(thumbnail().width(208).height(208));

  return (
    <View className='p-3 flex-1 justify-between'>

      <View>
        <Image source={{ uri: myImage.toURL() }} className='w-52 aspect-[1] rounded-full bg-slate-300 self-center' />
        <Text className='text-blue-500 font-semibold m-5 self-center' onPress={pickImage}>Change</Text>

        <Text className='font-semibold text-gray-500 mb-2'>Username</Text>
        <TextInput placeholder="Username" value={username} className='border border-gray-300 p-3 rounded-md' />
      </View>

      <View className='w-full gap-2'>
        <Button title="Update profile" />
        <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
      </View>

    </View>
  )
}

export default ProfileScreen