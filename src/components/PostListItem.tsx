import { View, Text, Image, useWindowDimensions, Pressable } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { cld } from '../lib/cloudinary';
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { router } from 'expo-router';

const PostListItem = ({ post }: any) => {

  const { width } = useWindowDimensions();
  const myImage = cld.image(post.image);

  myImage.resize(thumbnail().width(width).height(width)); 

  const avatar = cld.image(post.user.avatar_url || 'user-profile');
  avatar.resize(thumbnail().width(100).height(100));

  return (
    <View className='bg-white'>

      <Pressable onPress={()=>router.push(`/profiles/${post.user.id}`)}>
        <View className='p-2 flex-row items-center gap-2'>
          <Image source={{ uri: avatar.toURL() }} className='w-12 aspect-square rounded-full' />
          <Text className='font-semibold'>{post.user.username || "New User"}</Text>
        </View>
      </Pressable>

      <Image source={{ uri: myImage.toURL() }} className='w-full aspect-square' />

      <View className='flex-row justify-between p-2'>
        <View className='flex-row gap-3'>
          <AntDesign name="hearto" size={24} color="black" />
          <Ionicons name="chatbubble-outline" size={24} color="black" />
          <Feather name="send" size={24} color="black" />
        </View>

        <Feather name="bookmark" size={24} color="black" />
      </View>

    </View>
  )
}

export default PostListItem