import { View, Text,Image } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

const PostListItem = ({post}:any) => {
  return (
    <View className='bg-white'>
      <View className='p-2 flex-row items-center gap-2'>
        <Image source={{ uri: post.user.image_url }} className='w-12 aspect-square rounded-full' />
        <Text className='font-semibold'>{post.user.username}</Text>
      </View>
      <Image source={{ uri: post.image_url }} className='w-full aspect-square' />

      <View className='flex-row justify-between p-2'>
        <View className='flex-row gap-3'>
          <AntDesign name="hearto" size={24} color="black" />
          <Ionicons name="chatbubble-outline" size={24} color="black" />
          <Feather name="send" size={24} color="black" />
        </View>

        <Feather name="bookmark" size={24} color="black" className='ml-auto' />
      </View>

    </View>
  )
}

export default PostListItem