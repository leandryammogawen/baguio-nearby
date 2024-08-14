import { View, Text, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import GoogleMapViewFull from '../components/GoogleMapViewFull'
import SearchBar from '../components/SearchBar'
import { UserLocationContext } from '../components/UserLocationContext'
import GlobalApi from '../Services/GlobalApi'
import BusinessList from '../components/BusinessList'

const Search = () => {
    const [placeList, setPlaceList] = useState([]);
    const { location, setLocation } = useContext(UserLocationContext)

    useEffect(() => {
        GetNearBySearchPlace('restaurant')
    }, [])

    const GetNearBySearchPlace = (value) => {
        GlobalApi.searchByText(value).then(resp => {
            setPlaceList(resp.data.results)
        })
    }

    return (
        <View>
            <View className="absolute z-20 w-full">
                <SearchBar setSearchText={(value) => GetNearBySearchPlace(value)} />
            </View>
            <GoogleMapViewFull placeList={placeList} />
            <View className="absolute z-20 w-full bottom-0">
                <BusinessList placeList={placeList} />
            </View>
        </View>
    )
}

export default Search