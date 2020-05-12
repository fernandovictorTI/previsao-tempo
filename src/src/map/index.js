import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet, View, Dimensions } from 'react-native';

export default function App() {

    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        latitudeDelta: 1,
        longitudeDelta: 1,
      });

    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        async function getLocationAsync () {            

            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permissão não permitida pelo usuario!');
                return;
            }

            const { coords } = await Location.getCurrentPositionAsync({});

            let region = {
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 1,
                longitudeDelta: 1,
            };

            // Obter temperatura atual - const { data } = await api.get(`weather?lat=${region.latitude}&lon=${region.longitude}`);                

            setLocation(region);
        }
        
        getLocationAsync();
    }, []);
     
    return (
        <View style={styles.container}>
            {location.latitude && (<MapView
                style={styles.mapStyle}
                loadingEnabled={true}
                initialRegion={location}
            >
                {markers.map(marker => (
                    <Marker
                    draggable
                    coordinate={marker.x}
                    onDragEnd={(e) => { setMarkers({ x: e.nativeEvent.coordinate }); console.log(e); }}
                    />
                ))}
            </MapView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});