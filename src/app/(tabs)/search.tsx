import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

const search = () => {
    return (
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

            <View className='p-5'>
                <Text>Search</Text>
            </View>
        </View>
    )
}

export default search