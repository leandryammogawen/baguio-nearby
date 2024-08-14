import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const CategoryItem = ({ category }) => {
    return (
        <View className="w-fit flex-row justify-center items-center bg-white rounded-full px-4 py-2 mr-2 shadow">
            <Image
                source={category.icon}
                className="w-5 h-5"
                resizeMode='contain'
            />
            <Text className="text-black ml-2">
                {category.name}
            </Text>
        </View>
    )
}

const Category = ({ setSelectedCategory }) => {
    const categoryList = [
        {
            id: 1,
            name: 'Restaurant',
            value: 'restaurant',
            icon: require('../assets/icons/food_and_bev.png')
        },
        {
            id: 2,
            name: 'Coffee',
            value: 'cafe',
            icon: require('../assets/icons/cafe.png')
        },
        {
            id: 3,
            name: 'Attraction',
            value: 'tourist_attraction',
            icon: require('../assets/icons/to_do.png')
        },
        {
            id: 4,
            name: 'Bar',
            value: 'bar',
            icon: require('../assets/icons/bar.png')
        },
        {
            id: 5,
            name: 'Shopping',
            value: 'shopping_mall',
            icon: require('../assets/icons/shopping.png')
        }
    ]

    return (
        <View className="mt-2 ml-3">
            <FlatList
                data={categoryList}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedCategory(item.value)}>
                        <CategoryItem category={item} />
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default Category