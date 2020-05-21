import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { 
    StyleSheet, 
    View, 
    Dimensions } from 'react-native';
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

        _buscarRegiaoLocal = async () => {
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

        _buscarRegiaoLocal();
    }, []);

    function abrirDetalhePrevisao(coordinates) {
        setCoordenadas(coordinates);
        setDisplay(true);
    }

    function onFecharModal() {
        setDisplay(false);
    }

    function onFecharModalIncluirMarcadores(coordinate) {
        setDisplay(false);
        setMarkers([...markers,
        {
            coordinate,
            key: Guid.create()
        }]);        
    }
     
    return (
        <View style={styles.container}>
            {location.latitude && (<MapView
                style={styles.mapStyle}
                loadingEnabled={true}
                initialRegion={location}
                onPress={(e) => abrirDetalhePrevisao(e.nativeEvent.coordinate)}
                >
                {markers && (markers.map((marker) => (
                    <Marker 
                    { ...marker }
                    onPress={(e) => abrirDetalhePrevisao(e.nativeEvent.coordinate)}
                    />
                    ))
                )}
            </MapView>
            )}
            <DetalhePrevisaoComponent display={display} onFecharModal={onFecharModal} coordenadas={coordenadas} onSetMarkers={onFecharModalIncluirMarcadores} />
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