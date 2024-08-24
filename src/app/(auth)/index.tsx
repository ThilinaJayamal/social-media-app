import Button from '@/src/components/Button'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState, TextInput, Text, Image } from 'react-native'
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

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
    <View className='flex-1 justify-between p-5 bg-white'>

      <View>
        
        <Image source={require("assets/Instagram_logo.png")} className='w-52 self-center mt-5' resizeMode='contain' />
        
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={'none'}
            className='border border-gray-300 p-3 rounded-md bg-white'
          />
        </View>

        <View style={styles.verticallySpaced}>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={'none'}
            className='border border-gray-300 p-3 rounded-md bg-white'
          />
        </View>

        <View className='mt-16'>
          <Button title="Sign in" onPress={() => signInWithEmail()} />
        </View>

      </View>



      <View className='mt-6 gap-2'>
        <View className='border border-gray-300 mt-10' />
        <Text className='text-lg text-center'>If you don't have an account?{" "}
          <Text className='font-semibold text-blue-500' onPress={() => router.push("/signup")}>create a account</Text>
        </Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})