import React from 'react';
import { Marker } from 'react-native-maps';

const PlaceMarker = ({ item }) => {
    return (
        <Marker
            title={item.name}
            coordinate={{
                latitude: item.geometry.location.lat,
                longitude: item.geometry.location.lng,
            }}
        />
    );
};

export default PlaceMarker;
