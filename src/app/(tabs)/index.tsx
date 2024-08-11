import { View, Text, Image, ScrollView, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import posts from '@/assets/data/posts.json'
import PostListItem from '@/src/components/PostListItem';
import { supabase } from '@/src/lib/supabase';

const FeedScreen = () => {

  const [posts, setPosts] = useState<any[]|null>([]);

  useEffect(() => {
    fetchPosts();
  }, [])

  const fetchPosts = async () => {

    let { data, error } = await supabase.from('posts').select('* , user:profiles(*)');
    //select * from profiles as user.
    if(error){
      Alert.alert("Something went wrong");
    }
    setPosts(data);
  }

  return (
    <FlatList data={posts} renderItem={({ item }) =>
      <PostListItem post={item} />
    } contentContainerStyle={{ gap: 10 }} showsVerticalScrollIndicator={false} />
  )
}

export default FeedScreen