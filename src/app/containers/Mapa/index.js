import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { View } from 'react-native';
import DetalhePrevisaoComponent from '../DetalhePrevisao/index';
import { Guid } from "guid-typescript";
import {
    styles
  } from './index.style';

const MapaViewComponent = () => {

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
        onFecharModal();
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
};

export default MapaViewComponent;