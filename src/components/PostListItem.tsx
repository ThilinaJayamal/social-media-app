import { View, Text, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { AdvancedImage } from 'cloudinary-react-native';
import { cld } from '../lib/cloudinary';

// Import required actions and qualifiers.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

const PostListItem = ({ post }: any) => {

  const { width } = useWindowDimensions();
  const myImage = cld.image("cld-sample-3");
  myImage.resize(thumbnail().width(width).height(width));

  const avatar = cld.image(post.user.avatar_url);
  avatar.resize(thumbnail().width(48).height(48));
  //<AdvancedImage cldImg={myImage} className='w-full aspect-square'/>

  return (
    <View className='bg-white'>

      <View className='p-2 flex-row items-center gap-2'>
        <Image source={{ uri: post.user.image_url }} className='w-12 aspect-square rounded-full' />
        <Text className='font-semibold'>{post.user.username}</Text>
      </View>

      <AdvancedImage cldImg={myImage} style={{ width: 300, height: 200 }} />
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