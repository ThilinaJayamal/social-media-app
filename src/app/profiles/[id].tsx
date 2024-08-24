import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';

const UserProfile = () => {

    const { id } = useLocalSearchParams();

    return (
        <SafeAreaView>
            <View className='p-5'>
                <Text>{id}</Text>
            </View>
        </SafeAreaView>
    )
}

export default UserProfile