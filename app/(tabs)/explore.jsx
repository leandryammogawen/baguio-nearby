import { View } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import GlobalApi from '../../Services/GlobalApi'
import SearchBar from '../../components/SearchBar'
import GoogleMapViewFull from '../../components/GoogleMapViewFull'
import BusinessList from '../../components/BusinessList'
import { UserLocationContext } from '../../components/UserLocationContext'
import Category from '../../components/Category'

const Home = () => {
  const [placeList, setPlaceList] = useState([]);
  const { location } = useContext(UserLocationContext)

  useEffect(() => {
    if (location) {
      GetNearBySearchPlace('cafe');
    }
  }, [location])

  const GetNearBySearchPlace = (value) => {
    GlobalApi.nearByPlace(location.coords.latitude,
      location.coords.longitude, value).then(resp => {
        setPlaceList(resp.data.results)
      })
  }

  return (
    <View className="bg-white h-full">
      <View className="absolute z-20">
        <SearchBar setSearchText={(value) => GetNearBySearchPlace(value)} />
        {placeList ? (
          <Category setSelectedCategory={(value) => GetNearBySearchPlace(value)} />
        ) : ( null )}
      </View>

      <GoogleMapViewFull placeList={placeList} />

      <View className="absolute z-20 bottom-0">
        <BusinessList placeList={placeList} />
      </View>
    </View>
  )
}

export default Home