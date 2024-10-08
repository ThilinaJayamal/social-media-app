import { View, Text, Alert, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { supabase } from '@/src/lib/supabase';
import { ImageUrlGenerator } from '../(tabs)/search';
import { useAuth } from '@/src/providers/AuthProvider';
import Button from '@/src/components/Button';
import PostListItem from '@/src/components/PostListItem';

const UserProfile = () => {

    const { user } = useAuth();

    const { id } = useLocalSearchParams();

    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [name, setName] = useState("");
    const [posts, setPosts] = useState<null | any[]>([]);
    const [avatarUrl, setAvatarUrl] = useState("");

    const getProfile = async () => {
        if (!id) {
            return;
        }

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            Alert.alert("Can't fetch data from the server");
        }

        setUsername("@" + data.username);
        setName(data.full_name);
        setBio(data?.bio);
        setAvatarUrl(data.avatar_url);

    }

    const fetchPosts = async () => {

        let { data, error } = await supabase
            .from('posts')
            .select('* , user:profiles(*),my_likes:likes(*), likes(count)')
            .eq("user_id", id);

        if (error) {
            Alert.alert("Something went wrong");
        }
        console.log(data);
        data?.sort((a, b) => b.id - a.id);
        setPosts(data);
    }

    useEffect(() => {
        getProfile();
        fetchPosts();
    }, [])


    return (
        <View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={posts} renderItem={({ item }) => (
                    <View className='mb-5'>
                        <PostListItem post={item} />
                    </View>
                )} ListHeaderComponent={
                    <View className='items-center mb-8 p-5'>

                        <View className='bg-blue-500 h-52 w-full rounded-t-3xl' />

                        <View className='mt-[-104]'>
                            <Image source={{ uri: ImageUrlGenerator(avatarUrl, 250) }} className='w-52 h-52 rounded-full border border-gray-300' />
                        </View>

                        <View className='w-full mt-5'>
                            <View className='flex-row justify-between items-baseline'>
                                <View className='border-r-2 pr-4'>
                                    <Text className='font-semibold text-lg'>{name}</Text>
                                    <Text className='text-gray-600 text-base'>{username}</Text>
                                </View>

                                <View>
                                    <Text className='font-semibold text-xl text-center'>{posts?.length}</Text>
                                    <Text className='text-gray-800'>post</Text>
                                </View>

                                <View>
                                    <Text className='font-semibold text-xl text-center'>0</Text>
                                    <Text className='text-gray-800 '>following</Text>
                                </View>

                                <View>
                                    <Text className='font-semibold text-xl text-center'>0</Text>
                                    <Text className='text-gray-800 '>followers</Text>
                                </View>
                            </View>

                            <Text className='mt-4 text-base'>{bio}</Text>

                            {
                                (user?.id.toString() === id.toString()) ?
                                    <View className='mt-4 flex-row gap-5'>
                                        <View className='w-1/3'>
                                            <Button title='Edit Profile' onPress={() => router.push("/(tabs)/profile")} />
                                        </View>
                                        <View className='w-1/3'>
                                            <Button title='+ ADD' onPress={() => router.push("/(tabs)/new")} />
                                        </View>
                                    </View>
                                    :
                                    <View className='mt-4 w-2/4'>
                                        <Button title='Follow' onPress={() => router.push("/(tabs)/new")} />
                                    </View>
                            }

                        </View>
                    </View>

                } />

        </View>
    )
}

export default UserProfile