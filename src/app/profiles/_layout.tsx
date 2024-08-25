import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ProfileLayout = () => {
    return (
    <Stack>
        <Stack.Screen name='[id]' options={{headerTitle:"Profile",headerTitleAlign:"center"}}/>
    </Stack>
  )
}

export default ProfileLayout