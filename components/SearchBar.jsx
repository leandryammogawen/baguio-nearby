import { View, Text, Dimensions, Image } from 'react-native'
import React from 'react'
import SearchInput from './Searchinput'

const SearchBar = () => {
    return (
        <View className="mt-10 flex px-3 pt-5 shadow-2xl w-full">
            <SearchInput
                className="shadow-2xl"
                placeholder="Search"
                onChangeText={(value) => setSearchInput(value)}
                onSubmitEditing={() => setSearchText(searchInput)}
            />
        </View>
    )
}

export default SearchBar