import { View,FlatList, Alert, Pressable, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import PostListItem from '@/src/components/PostListItem';
import { supabase } from '@/src/lib/supabase';
import { router, Stack } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const FeedScreen = () => {
  const [posts, setPosts] = useState<any[] | null>([]);
  useEffect(() => {
    fetchPosts();
  }, [])

  const fetchPosts = async () => {
    let { data, error } = await supabase.from('posts').select('* , user:profiles(*),my_likes:likes(*)');
    if (error) {
      Alert.alert("Something went wrong");
    }
    data?.sort((a, b) => b.id - a.id);
    setPosts(data);
  }

  return (
    <>
      <Stack.Screen options={{
        headerRight: () =>
        (
          <Pressable onPress={() => router.push("/search")}>
            <View className='mr-10'>
              <FontAwesome5 name="search" size={24} color="black" />
            </View>
          </Pressable>
        )
      }} />
      <FlatList data={posts} renderItem={({ item }) =>
        <PostListItem post={item} />
      } contentContainerStyle={{ gap: 10 }} showsVerticalScrollIndicator={false}/>
    </>
  )
}

export default FeedScreen