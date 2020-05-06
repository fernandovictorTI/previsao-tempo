import React from 'react';
import MapView from 'react-native-maps';
import Constants from 'expo-constants';

import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function App() {
    return (
        <View style={styles.container}>
            <MapView style={styles.mapStyle} />
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