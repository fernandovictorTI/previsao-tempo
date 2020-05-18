import React, { useEffect, useState } from 'react';
import { Animated, Button, View, StyleSheet, Text, Image } from 'react-native';
import Modal from 'react-native-modal';
import api from '../../shared/services/openweather.services';

export default function DetalhePrevisaoComponent( { display, onFecharModal, coordenadas } ){    

    const [previsao, setPrevisao] = useState(null);

    useEffect(() => {

        async function buscarTemperaturaAtual() {

            if(!coordenadas) {
                return;
            }

            const { data } = await api.get(`weather?lat=${coordenadas.latitude}&lon=${coordenadas.longitude}`);
            console.log(data);
            setPrevisao(data);
        }

        buscarTemperaturaAtual();
    }, [coordenadas]);

    function obterDiaSemana() {
        var d = new Date();
        var diasSemana = new Array(7);
        diasSemana[0] = "Domingo";
        diasSemana[1] = "Segunda-feira";
        diasSemana[2] = "Terça-feira";
        diasSemana[3] = "Quarta-feira";
        diasSemana[4] = "Quinta-feira";
        diasSemana[5] = "Sexta-feira";
        diasSemana[6] = "Sábado";

        return diasSemana[d.getDay()];
    }

    function obterHoraAtual() {
        var d = new Date();
        return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`
    }

    function converterTemperaturaCelcius(temp) {
        return parseFloat((temp - 273.15).toFixed(2))
    }

    return (
        <>
            {previsao && (<Modal 
                isVisible={display} 
                onBackdropPress={onFecharModal}
                animationInTiming={1000}
                animationOutTiming={1000}
                backdropTransitionInTiming={800}
                backdropTransitionOutTiming={800}
            >
                        <View style={styles.content}>
                            
                            <Animated.View style={styles.header}>
                                <Text style={styles.header_text}>
                                    {previsao.name} - {previsao.sys.country}
                                </Text>
                                <Text>
                                    {obterDiaSemana()}, {obterHoraAtual()}
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
                                            {converterTemperaturaCelcius(previsao.main.temp)} 
                                            <Text style={styles.body_temp_graus}>ºC</Text>
                                    </Text>
                                    <Text style={styles.body_temp_max_min}>
                                        Max {converterTemperaturaCelcius(previsao.main.temp_max)} º / Min {converterTemperaturaCelcius(previsao.main.temp_min)} º
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
                                        A temperatura agora é de {converterTemperaturaCelcius(previsao.main.temp)} ºC e parece {converterTemperaturaCelcius(previsao.main.feels_like)} ºC lá fora. O vento está soprando cerca de {(previsao.wind.speed * 3.6).toFixed(2)} km/h pressão de {previsao.main.pressure} hPa.
                                    </Text>                           
                                </View>
                            </Animated.View>                            

                            <Animated.View style={styles.footer}>
                                <Button onPress={onFecharModal} title="Fechar" /> 
                            </Animated.View>
                        </View>
            </Modal> )}
        </>
    );    
}

const styles = StyleSheet.create({
    content: {
      flex: 1,
      flexDirection: "column",
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
        flex: 0
    },
    footer: {
        flex: 0,
        position: "relative"
    },
    header_text: {
        fontSize: 25,
        fontWeight: "bold",
    },
    body: {
        flex: 0
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
    }
  });