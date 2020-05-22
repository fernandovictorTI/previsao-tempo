import React, { useEffect, useState } from 'react';
import { Button, View, Text, Image, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import openWeatherService from '../../services/openweather.services';
import dataHelper from '../../helper/data.helper';
import temperaturaHelper from '../../helper/temperatura.helper';
import {
    styles,
    buttons
  } from './index.style';


const DetalhePrevisaoComponent = ({ display, onFecharModal, coordenadas, onSetMarkers }) => {

    const [previsao, setPrevisao] = useState(null);

    useEffect(() => {

        _obterPrevisaoTempoAtual = async ()  => {

            if(!coordenadas) {
                return;
            }

            const { data } = await openWeatherService.get(`weather?lat=${coordenadas.latitude}&lon=${coordenadas.longitude}`);
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
                        <View style={styles.card}>

                            <ScrollView>
                            
                                <View style={styles.header}>
                                    <Text style={styles.headerTitle}>
                                        {previsao.name} - {previsao.sys.country}
                                    </Text>
                                    <Text>
                                        {dataHelper.obterDiaSemana()}, {dataHelper.obterHoraAtual()}
                                    </Text>
                                    <Text>
                                        {previsao.weather[0].description}
                                    </Text>
                                </View>

                                <View style={styles.body}>
                                    <Text style={styles.bodyTemperaturaText}>
                                            <Image
                                            style={styles.body_image}
                                            source={{uri: `http://openweathermap.org/img/wn/${previsao.weather[0].icon}@2x.png`}}
                                            />
                                            {temperaturaHelper.converterTemperaturaKelvinToCelcius(previsao.main.temp)} 
                                            <Text style={styles.bodyTemperaturaGrausText}>ºC</Text>
                                    </Text>
                                    <Text>
                                        Max {temperaturaHelper.converterTemperaturaKelvinToCelcius(previsao.main.temp_max)} º / Min {temperaturaHelper.converterTemperaturaKelvinToCelcius(previsao.main.temp_min)} º
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

                                    <Text style={styles.bodyTemperaturaObservacaoText}>                                        
                                        A temperatura agora é de {temperaturaHelper.converterTemperaturaKelvinToCelcius(previsao.main.temp)} ºC e parece {temperaturaHelper.converterTemperaturaKelvinToCelcius(previsao.main.feels_like)} ºC lá fora. O vento está soprando cerca de {(previsao.wind.speed * 3.6).toFixed(2)} km/h pressão de {previsao.main.pressure} hPa.
                                    </Text>                           
                                </View>
                            </ScrollView>                        

                            <View style={styles.footer}>
                                <Button
                                    style={buttons.buttonFavoritar}
                                    title="Favoritar Posição"
                                    color="#302f2b"
                                    onPress={() => onSetMarkers(coordenadas)}
                                />
                            </View>
                        </View>
            </Modal> )}
        </>
    );
};

export default DetalhePrevisaoComponent;