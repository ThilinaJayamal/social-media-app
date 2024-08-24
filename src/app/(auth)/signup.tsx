import Button from '@/src/components/Button'
import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState, TextInput, Image } from 'react-native'
import { supabase } from 'src/lib/supabase'

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})

const signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function signUpWithEmail() {
        setLoading(true)
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)
    }
    return (

        <View className='p-5 flex-1 justify-between bg-white'>
            
            <View className='gap-2'>
            <Image source={require("assets/Instagram_logo.png")} className='w-52 self-center' resizeMode='contain' />
                <View>
                    <TextInput
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        placeholder="email@address.com"
                        autoCapitalize={'none'}
                        className='border border-gray-300 p-3 rounded-md bg-white'
                    />
                </View>
                <View>
                    <TextInput
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                        placeholder="Password"
                        autoCapitalize={'none'}
                        className='border border-gray-300 p-3 rounded-md bg-white'
                    />
                </View>
            </View>
            <View>
                <Button title="Sign up" onPress={() => signUpWithEmail()} />
            </View>
        </View>
    )
}


export default signup