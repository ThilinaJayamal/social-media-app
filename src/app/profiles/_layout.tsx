import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const profileLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='[id]' options={{headerTitle:"Profile",headerTitleAlign:"center",headerShown:true}}/>
    </Stack>
  )
}

export default profileLayout