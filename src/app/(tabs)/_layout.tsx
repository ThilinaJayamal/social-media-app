import { View, Text, Pressable, StatusBar } from 'react-native'
import React from 'react'
import { Redirect, router, Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuth } from '@/src/providers/AuthProvider';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import NotificationProvider from '@/src/providers/NotificationProvider';


const TabLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href={"/(auth)"} />
  }

  return (
    <NotificationProvider>
      <Tabs screenOptions={{
        tabBarActiveTintColor: 'black', tabBarShowLabel: false,
      }}>

        <Tabs.Screen name="index" options={{
          headerTitle: 'For you', headerTitleAlign: "center",
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={26} color={color} />
        }} />

        <Tabs.Screen name="new" options={{
          headerTitle: 'Create post', headerTitleAlign: "center",
          tabBarIcon: ({ color }) => <FontAwesome name="plus-square-o" size={26} color={color} />
        }} />

        <Tabs.Screen name="profile" options={{
          headerTitle: 'Update Profile', headerTitleAlign: "center",
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={26} color={color} />
        }} />

        <Tabs.Screen name='search' options={{ href: null, headerTitleAlign: 'center', headerTitle: 'Search' }} />
      </Tabs>
    </NotificationProvider>
  )
}

export default TabLayout