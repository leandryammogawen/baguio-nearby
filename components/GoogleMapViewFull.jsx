import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserLocationContext } from './UserLocationContext'
import MapView, { Marker } from 'react-native-maps'
import PlaceMarker from './PlaceMarker'

const GoogleMapViewFull = ({ placeList }) => {
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
        <View>
            <MapView
                className="w-full h-full"
                showsUserLocation={true}
                region={mapRegion}
            >
                {placeList.map((item, index) => (
                    <PlaceMarker item={item} key={index} />
                ))}
            </MapView>
        </View>
    )
}

export default GoogleMapViewFull