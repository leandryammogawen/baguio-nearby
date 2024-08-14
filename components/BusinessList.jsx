import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "expo-router";
import { images } from '../constants';

const BusinessItem = ({ place }) => {
    const numberOfStars = Math.round(place.rating)
    const photoReference = place?.photos?.[0]?.photo_reference;
    const photoUrl = photoReference
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=AIzaSyD_w-htZhqtYo6BOkN55ENrrTdFJY8vD-U`
        : null;

    return (
        <View className="w-80 h-fit bg-white rounded-lg p-3 m-1.5 shadow">
            {photoUrl ? (
                <Image
                    className="w-full h-40"
                    style={{ borderRadius: 5 }}
                    source={{ uri: photoUrl }}
                />
            ) : (
                <Image
                    className="w-full h-40"
                    source={images.placeholder}
                    style={{ borderRadius: 10 }}
                />
            )}

            <Text className="text-pblack font-psemibold text-lg mt-2" numberOfLines={1}>{place.name}</Text>

            <View className="flex-row items-center mt-1">
                {numberOfStars > 0 && (
                    <>
                        {[...Array(numberOfStars)].map((_, index) => (
                            <AntDesign key={index} name="star" size={14} color={'gold'} />
                        ))}
                    </>
                )}
                <Text className="text-gray-500 ml-1">{place.user_ratings_total}</Text>
            </View>

            <Text numberOfLines={1} className="text-gray-500 mt-1">
                {place.vicinity ? place.vicinity : place.formatted_address}
            </Text>
        </View>
    );
};

const BusinessList = ({ placeList }) => {
    const navigator = useNavigation();
    const onPlaceClick = (item) => {
        navigator.navigate('PlaceDetail', { place: item })
    }

    if (!Array.isArray(placeList) || placeList.length === 0) {
        return <Text>No data available</Text>;
    }

    return (
        <View>
            <FlatList
                data={placeList}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => onPlaceClick(item)}>
                        <BusinessItem place={item} />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default BusinessList;
