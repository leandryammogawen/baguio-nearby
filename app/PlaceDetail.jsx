import { View, Text, ScrollView, Image, TouchableOpacity, Platform, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from '@react-navigation/native'
import GoogleMapView from '../components/GoogleMapView';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';

const PlaceDetailItem = ({ place }) => {
  const capitalizeFirstLetter = (string) => {
    if (typeof string !== 'string' || string.length === 0) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const numberOfStars = Math.round(place.rating)
  const priceLevel = Math.round(place.price_level)

  const typesArray = Array.isArray(place.types) ? place.types.slice(0, 2) : [];
  const formattedTypes = typesArray.map(type => capitalizeFirstLetter(type)).join(' • ');

  const photoReference = place?.photos?.[0]?.photo_reference;
  const photoUrl = photoReference
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=AIzaSyD_w-htZhqtYo6BOkN55ENrrTdFJY8vD-U`
    : null;

  return (
    <View className="bg-white">
      {photoUrl ? (
        <Image
          className="w-full h-64 rounded-b-2xl"
          resizeMode='cover'
          style={{ borderRadius: 5 }}
          source={{ uri: photoUrl }}
        />
      ) : (
        <Image
          className="w-full h-96 rounded-b-2xl"
          resizeMode='cover'
          source={images.placeholder}
          style={{ borderRadius: 10 }} />
      )}
      <View className="m-6">
        <Text className="text-3xl font-bold">{place.name}</Text>

        <Text numberOfLines={1} className="mt-1">
          {place.vicinity ? place.vicinity : place.formatted_address}
        </Text>

        <View className="flex-row items-center mt-1">
          {numberOfStars > 0 && (
            <>
              {[...Array(numberOfStars)].map((_, index) => (
                <AntDesign key={index} name="star" size={14} color={'gold'} />
              ))}
            </>
          )}
          <Text className="ml-1">{place.user_ratings_total}</Text>
        </View>

        <View className="flex-row items-center mt-1">
          {priceLevel > 0 && (
            <>
              {[...Array(priceLevel)].map((_, index) => (
                <Text className="text-lg" key={index}>₱</Text>
              ))}
            </>
          )}

          <Text className="px-2">•</Text>
          <Text>{formattedTypes}</Text>
        </View>

        {place?.opening_hours ? (
          <Text className="mt-5 font-psemibold">
            {place?.opening_hours?.open_now == true ?
              "Open now" :
              "Closed now"}
          </Text>
        ) : null}

      </View>
    </View>
  )
}

const PlaceDetail = () => {
  const param = useRoute().params;
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (param && param.place) {
      setPlace(param.place);
    }
  }, [param]);

  const onDirectionClick = async () => {
    try {
      if (place && place.geometry && place.geometry.location) {
        const url = Platform.select({
          ios: `maps:${place.geometry.location.lat},${place.geometry.location.lng}?q=${place.vicinity}`,
          android: `geo:${place.geometry.location.lat},${place.geometry.location.lng}?q=${place.vicinity}`,
        });

        if (url) {
          await Linking.openURL(url);
        } else {
          console.log("URL not constructed correctly.");
        }
      } else {
        console.log("Location information is not available.");
      }
    } catch (error) {
      console.error("Failed to open the map URL:", error);
    }
  }

  if (!place) {
    return null; // or you can return a loading indicator
  }

  return (
    <ScrollView>
      <PlaceDetailItem place={place} onDirectionClick={onDirectionClick} />

      <GoogleMapView placeList={[place]} />

      <CustomButton
        title="Get Direction on Google Map"
        handlePress={onDirectionClick}
        containerStyles="mt-7 mx-3"
      />
    </ScrollView>
  );
}

export default PlaceDetail