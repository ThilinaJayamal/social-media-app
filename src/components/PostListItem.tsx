import { View, Text, Image, useWindowDimensions, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { cld } from '../lib/cloudinary';
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { router } from 'expo-router';
import { supabase } from '../lib/supabase';
import { useAuth } from '../providers/AuthProvider';

type typeLikeRecord = {
  id: number
}

const PostListItem = ({ post }: any) => {

  const [isLiked, setIsLiked] = useState(false);
  const [likeRecord, setLikeRecord] = useState<null | typeLikeRecord>(null);
  const { user } = useAuth();

  useEffect(() => {
  
    if (post.my_likes.length > 0) {
      setLikeRecord(post.my_likes[0]);
      setIsLiked(true);
    }
  }, [post.my_likes]);

  useEffect(() => {
    if (isLiked) {
      saveLike();
    } else {
      deleteLike();
    }
  }, [isLiked]);

  const saveLike = async () => {
    if (likeRecord) {
      return;
    }
    const { data } = await supabase
      .from('likes')
      .insert([{ user_id: user?.id, post_id: post.id }])
      .select();
    if (data) {
      setLikeRecord(data[0]);
    }

  };

  const deleteLike = async () => {
    if (likeRecord) {
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('id', likeRecord.id);
      if (!error) {
        setLikeRecord(null);
      }
    }
  };


  const { width } = useWindowDimensions();
  const myImage = cld.image(post.image);

  myImage.resize(thumbnail().width(width).height(width));

  const avatar = cld.image(post.user.avatar_url || 'user-profile');
  avatar.resize(thumbnail().width(100).height(100));

  return (
    <View className='bg-white'>

      <Pressable onPress={() => router.push(`/profiles/${post.user.id}`)}>
        <View className='px-3 py-2 flex-row items-center gap-2'>
          <Image source={{ uri: avatar.toURL() }} className='w-12 aspect-square rounded-full' />
          <Text className='font-semibold'>{post.user.username || "New User"}</Text>
        </View>
      </Pressable>

      {
        post.caption &&
        (
          <View className='px-3 pb-2'>
            <Text className='text-lg'>{post.caption}</Text>
          </View>
        )
      }

      <Pressable onPress={() => { }}>
        <Image source={{ uri: myImage.toURL() }} className='w-full aspect-square' />
      </Pressable>

      <View className='flex-row justify-between px-3 py-2'>
        <View className='flex-row gap-3'>
          <AntDesign name={isLiked ? "heart" : "hearto"}
            size={24} color={isLiked ? "red" : "black"}
            onPress={() => setIsLiked(!isLiked)} />
          <Ionicons name="chatbubble-outline"
            size={24} color="black" />
          <Feather name="send" size={24} color="black" />
        </View>

        <Feather name="bookmark" size={24} color="black" />
      </View>

      <View className='px-3 pb-2'>
        <Text className='font-semibold'>{post.likes[0].count+" "}likes</Text>
      </View>

    </View>
  )
}

export default PostListItem