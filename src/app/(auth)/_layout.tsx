import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '@/src/providers/AuthProvider'
import { Redirect, Stack } from 'expo-router';

const AuthLayout = () => {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) {
        return (
            <Redirect href={"/(tabs)"} />
        )
    }
    return (
        <Stack />
    )
}

export default AuthLayout