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
  const myImage = cld.image(post.image);

  myImage.resize(thumbnail().width(width).height(width));

  // myImage
  //.resize(thumbnail().width(150).height(150).gravity(focusOn(FocusOn.face())))  // Crop the image, focusing on the face.
  // .roundCorners(byRadius(100)); 

  const avatar = cld.image(post.user.avatar_url);
  avatar.resize(thumbnail().width(48).height(48));
  //<AdvancedImage cldImg={myImage} className='w-full aspect-square'/>

  return (
    <View className='bg-white'>

      <View className='p-2 flex-row items-center gap-2'>
        <Image source={{ uri: avatar.toURL() }} className='w-12 aspect-square rounded-full' />
        <Text className='font-semibold'>{post.user.username}</Text>
      </View>

      <Image source={{ uri: myImage.toURL() }} className='w-full aspect-square' />

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