import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';


const TabLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'black' ,tabBarShowLabel:false}}>

      <Tabs.Screen name="index" options={{
        headerTitle: 'For you', headerTitleAlign: "center",
        tabBarIcon: ({ color }) => <FontAwesome name="home" size={26} color={color} />
      }} />

      <Tabs.Screen name="new" options={{
        headerTitle: 'Create post', headerTitleAlign: "center",
        tabBarIcon: ({ color }) => <FontAwesome name="plus-square-o" size={26} color={color} />
      }} />

      <Tabs.Screen name="profile" options={{
        headerTitle: 'Profile', headerTitleAlign: "center",
        tabBarIcon: ({ color }) => <FontAwesome name="user" size={26} color={color} />
      }} />
    </Tabs>
  )
}

export default TabLayout