import { View, Text,TextInput } from 'react-native'
import React from 'react'

const CustomTextInput = ({label,...textInputProps}:any) => {
    return (
        <View>
            <Text className='font-semibold text-gray-500 mb-2'>{label}</Text>
            <TextInput {...textInputProps} className='border border-gray-300 p-3 rounded-md' />
        </View>
    )
}

export default CustomTextInput