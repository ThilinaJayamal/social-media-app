import { View, Text, Pressable, TextInput, Alert, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { router, Stack } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { supabase } from '@/src/lib/supabase';
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { cld } from '@/src/lib/cloudinary';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export const ImageUrlGenerator = (item: string,size:number) => {
    const avatar = cld.image(item || 'user-profile');
    avatar.resize(thumbnail().width(size).height(size));

    return avatar.toURL();
}

const search = () => {

    const [searchName, setSerchName] = useState("");
    const [result, setResult] = useState<any[] | null>([]);


    const fetchUser = async () => {

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .like('full_name', `${searchName}%`);
        //select * from profiles as user.
        if (error) {
            Alert.alert("Something went wrong");
        }
        setResult(data);
    }

    return (
        <>
            <View>
                <Stack.Screen options={{
                    headerLeft: () =>
                    (
                        <Pressable onPress={() => router.back()}>
                            <View className='p-5'>
                                <Ionicons name="arrow-back" size={24} color="black" />
                            </View>
                        </Pressable>
                    )
                }} />

                <View className='p-5 flex-row w-full justify-center items-center gap-2 mt-5'>
                    <TextInput placeholder='Search...' className='p-3 bg-white border-gray-300 border rounded-xl w-2/3'
                        onChangeText={setSerchName}
                        onChange={fetchUser}
                    />
                    <FontAwesome name="search" size={28} color="white" className='bg-blue-500 p-3 rounded-xl' onPress={fetchUser} />
                </View>

                <View>
                    {
                        result?.length == 0 &&
                        <View className='p-5'>
                            <Text className='text-center text-blue-500 text-lg font-semibold'>No Results</Text>
                        </View>
                    }
                </View>
            </View>

            <FlatList data={result} renderItem={({ item }) => (
                <Pressable onPress={() => router.push(`/profiles/${item.id}`)}>
                    <View key={item} className='p-5'>
                        <View className='flex-row gap-3 items-center'>

                            <Image source={{ uri: ImageUrlGenerator(item?.avatar_url,100) }} className='w-14 h-14 rounded-full' />

                            <View>
                                <Text className='font-semibold text-gray-500'>{item?.full_name}</Text>
                                {
                                    item?.full_name.toLowerCase() === "thilina jayamal" ?
                                        <View className='flex-row items-center'>
                                            <Text className='text-green-500'>vertified</Text>
                                            <MaterialIcons name="gpp-good" size={15} color="green" />
                                        </View>
                                        : ""
                                }

                            </View>

                        </View>

                    </View>
                </Pressable>
            )} className='gap-1' />
        </>
    )
}

export default search