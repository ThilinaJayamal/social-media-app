import { View, Text, Image, TextInput, Pressable, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import Button from '@/src/components/Button';
import { supabase } from '@/src/lib/supabase';
import { useAuth } from '@/src/providers/AuthProvider';
import { cld, uploadImage } from '@/src/lib/cloudinary';
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import CustomTextInput from '@/src/components/CustomTextInput';
import { router } from 'expo-router';

const ProfileScreen = () => {

  const [image, setImage] = useState<undefined | string>(undefined);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('user-profile');

  const [bio, setBio] = useState('');

  const { user } = useAuth();


  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    if (!user) {
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id)
      .single();

    if (error) {
      Alert.alert("Can't fetch data from the server");
    }

    setUsername(data.username);
    setBio(data?.bio);
    setAvatarUrl(data.avatar_url);
  }


  const updateProfile = async () => {
    if (!user) {
      return;
    }

    const updatedProfile = {
      id: user?.id,
      username: username,
      bio: bio,
      avatar_url: avatarUrl
    }

    if (image) {
      const response = await uploadImage(image);
      console.log(response.public_id);
      updatedProfile.avatar_url = response.public_id;
    }

    const { data, error } = await supabase.from('profiles').upsert(updatedProfile);

    if (error) {
      Alert.alert("Faild to update profile" + error);
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

  const avatar = cld.image(avatarUrl);
  avatar.resize(thumbnail().width(250).height(250));

  return (
    <ScrollView>
      <View className='p-3 flex-1 justify-between gap-8'>

        <View>
          {
            image ? <Image source={{ uri: image }} className='w-52 aspect-[1] rounded-full bg-slate-300 self-center' /> :
              (avatarUrl ? <Image source={{ uri: avatar.toURL() }} className='w-52 aspect-[1] rounded-full bg-slate-300 self-center' /> : <View className='w-52 aspect-[1] rounded-full bg-slate-300 self-center' />)
          }

          <Text className='text-blue-500 font-semibold m-5 self-center' onPress={pickImage}>Change</Text>

          <View className='gap-5'>
            <CustomTextInput placeholder="username" value={username}
              onChangeText={setUsername} label="Username" />

            <CustomTextInput placeholder="" value={bio} onChangeText={setBio}
              multiline numberOfLines={3} label={"Bio"} />
          </View>

        </View>

        <View className='w-full gap-2 mt-8'>
          <Button title="View profile" onPress={() => router.push(`/profiles/${user?.id}`)} />
          <Button title="Update profile" onPress={updateProfile} />
          <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
        </View>

      </View>

    </ScrollView>
  )
}

export default ProfileScreen