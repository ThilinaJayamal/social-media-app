import { View, Text, Image, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'

const AddPost = () => {

  const [caption, setCaption] = useState("");
  return (
    <View className='p-3 items-center flex-1 justify-between'>

      <View className='w-full items-center'>
        <Image source={{ uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg" }} className='w-52 aspect-[3/4] rounded-xl' />
        <Text className='text-blue-500 font-semibold m-5' onPress={() => { }}>Change</Text>
        <TextInput placeholder="What's in your mind" className='w-full p-3' value={caption} onChangeText={(newCaption) => setCaption(newCaption)} />
      </View>

      <View className='w-full'>
        <Pressable className='w-full p-3 bg-blue-500 rounded-md items-center'>
          <Text className='text-white font-semibold'>Share</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default AddPost