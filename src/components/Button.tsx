import { View, Text, Pressable } from 'react-native'
import React from 'react'

type ButtonProps = {
    title:string,
    onPress?:()=>void
}

const Button = ({title,onPress}:ButtonProps) => {
    return (
        <Pressable className='w-full p-3 bg-blue-500 rounded-md items-center' onPress={onPress}>
            <Text className='text-white font-semibold'>{title}</Text>
        </Pressable>
    )
}

export default Button