import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@/src/providers/AuthProvider'
import { Redirect, Stack } from 'expo-router';

const AuthLayout = () => {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) {
        return (
            <Redirect href={"/(tabs)/"} />
        )
    }
    return (
        <Stack>
            <Stack.Screen name='index' options={{title:"Welcome Back!",headerTitleAlign:'center',headerShown:false}}/>
            <Stack.Screen name="signup" options={{title:"Create a new account",headerTitleAlign:'center'}}/>
        </Stack>
    )
}

export default AuthLayout