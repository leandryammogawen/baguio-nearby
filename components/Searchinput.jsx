import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const SearchInput = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    return (
        <View className="flex-row w-full h-12 px-4 bg-white rounded-2xl focus:border-secondary items-center space-x-4">
            <TextInput
                className="text-base mt-0.5 text-white flex-1 front-pregular"
                value={value}
                placeholder="Search for places"
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChangeText}
            />
        </View>
    )
}

export default SearchInput