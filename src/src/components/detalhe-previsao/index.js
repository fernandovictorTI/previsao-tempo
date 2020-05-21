import React, { useEffect, useState } from 'react';
import { Animated, Button, View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import api from '../../shared/services/openweather.services';
import utilsFunctions from '../../shared/utils/utils';

export default function DetalhePrevisaoComponent( { display, onFecharModal, coordenadas, onSetMarkers } ){    

    const [previsao, setPrevisao] = useState(null);

    useEffect(() => {

        _obterPrevisaoTempoAtual = async ()  => {

            if(!coordenadas) {
                return;
            }

            const { data } = await api.get(`weather?lat=${coordenadas.latitude}&lon=${coordenadas.longitude}`);
            setPrevisao(data);
        }

        _obterPrevisaoTempoAtual();
    }, [coordenadas]);
    
    return (
        <>
            {previsao && (<Modal 
                isVisible={display} 
                onBackdropPress={onFecharModal}
                onBackButtonPress={onFecharModal}                
                onSwipeComplete={onFecharModal}
                swipeDirection="left"
                animationInTiming={1000}
                animationOutTiming={1000}
                backdropTransitionInTiming={800}
                backdropTransitionOutTiming={800}
            >
                        <View style={styles.content}>

                            <ScrollView>
                            
                                <Animated.View style={styles.header}>
                                    <Text style={styles.header_text}>
                                        {previsao.name} - {previsao.sys.country}
                                    </Text>
                                    <Text>
                                        {utilsFunctions.obterDiaSemana()}, {utilsFunctions.obterHoraAtual()}
                                    </Text>
                                    <Text>
                                        {previsao.weather[0].description}
                                    </Text>
                                </Animated.View>

                                <Animated.View style={styles.body}>
                                    <View>
                                        <Text style={styles.body_temp}>
                                                <Image
                                                style={styles.body_image}
                                                source={{uri: `http://openweathermap.org/img/wn/${previsao.weather[0].icon}@2x.png`}}
                                                />
                                                {utilsFunctions.converterTemperaturaCelcius(previsao.main.temp)} 
                                                <Text style={styles.body_temp_graus}>ºC</Text>
                                        </Text>
                                        <Text style={styles.body_temp_max_min}>
                                            Max {utilsFunctions.converterTemperaturaCelcius(previsao.main.temp_max)} º / Min {utilsFunctions.converterTemperaturaCelcius(previsao.main.temp_min)} º
                                        </Text>
                                        <Text>
                                            Humidade: {previsao.main.humidity} %
                                        </Text>  
                                        <Text>
                                            Vento: {(previsao.wind.speed * 3.6).toFixed(2)} km/h
                                        </Text>
                                        <Text>
                                            Pressão: {previsao.main.pressure} hPa                                        
                                        </Text>

                                        <Text style={styles.body_observacao}>                                        
                                            A temperatura agora é de {utilsFunctions.converterTemperaturaCelcius(previsao.main.temp)} ºC e parece {utilsFunctions.converterTemperaturaCelcius(previsao.main.feels_like)} ºC lá fora. O vento está soprando cerca de {(previsao.wind.speed * 3.6).toFixed(2)} km/h pressão de {previsao.main.pressure} hPa.
                                        </Text>                           
                                    </View>
                                </Animated.View>
                            </ScrollView>                        

                            <Animated.View style={styles.footer}>
                                <Button
                                    style={styles.buttonFavoritar}
                                    title="Favoritar Posição"
                                    color="#302f2b"
                                    onPress={() => onSetMarkers(coordenadas)}
                                />
                            </Animated.View>
                        </View>
            </Modal> )}
        </>
    );    
}

const styles = StyleSheet.create({
    content: {
      flex: 1,
      backgroundColor: 'white',
      padding: 22,
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10
    },
    contentTitle: {
      fontSize: 20,
      marginBottom: 12,
    },
    header: {
    },
    footer: {
        paddingTop: 50
    },
    header_text: {
        fontSize: 25,
        fontWeight: "bold",
    },
    body: {
    },
    body_temp: {
        fontSize: 50,
        textAlign: "center"
    },
    body_temp_graus: {
        fontSize: 20,
        textAlignVertical: "top"
    },
    body_image:{
        width: 100,
        height: 100
    },
    body_temp_max_min: {
        textAlign: "center",
        fontSize: 6,
        marginBottom: 10
    },
    body_observacao: {
        fontSize: 18,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: "justify"
    },
    buttonFavoritar: {
    }
  });