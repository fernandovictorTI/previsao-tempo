import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet, View, Dimensions } from 'react-native';
import DetalhePrevisaoComponent from '../../components/detalhe-previsao';
import { Guid } from "guid-typescript";

export default function App() {

    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        latitudeDelta: 1,
        longitudeDelta: 1,
      });
    const [markers, setMarkers] = useState([]);
    const [display, setDisplay] = useState(false);
    const [coordenadas, setCoordenadas] = useState(null);

    useEffect(() => {

        async function buscarRegiaoLocal() {
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

            setLocation(region);
        }

        buscarRegiaoLocal();
    }, []);

    function abrirDetalhePrevisao(coordinates) {
        // setMarkers(...markers,
        //     {
        //         coordinate: coordinates,
        //         key: Guid.create()
        //     });
        setCoordenadas(coordinates);
        setDisplay(true);
    }

    function onFecharModal() {
        setDisplay(false);
    }
     
    return (
        <View style={styles.container}>
            {location.latitude && (<MapView
                style={styles.mapStyle}
                loadingEnabled={true}
                initialRegion={location}
                onPress={(e) => abrirDetalhePrevisao(e.nativeEvent.coordinate)}
                >
                {markers.map((marker) => (
                    <Marker { ...marker }/>
                ))}
            </MapView>
            )}
            <DetalhePrevisaoComponent display={display} onFecharModal={onFecharModal} coordenadas={coordenadas} />
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