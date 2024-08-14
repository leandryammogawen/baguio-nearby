import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { UserLocationContext } from '../components/UserLocationContext'
import PlaceMarker from '../components/PlaceMarker'

const GoogleMapView = ({ placeList }) => {
    const [mapRegion, setmapRegion] = useState({})

    const { location, setLocation } = useContext(UserLocationContext)

    useEffect(() => {
        if (location) {
            setmapRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0322,
                longitudeDelta: 0.0421,
            })
        }
    }, [location])

    return (
        <View className="mt-5" style={{ borderRadius: 10, overflow: "hidden" }}>
            <MapView
                className="w-full h-56"
                showsUserLocation={true}
                region={mapRegion}
            >
                {placeList.map((item, index) => index <= 4 && (
                    <PlaceMarker item={item} key={index} />
                ))}
            </MapView>
        </View>
    )
}

export default GoogleMapView