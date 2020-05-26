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
    const [previsaoSelecionada, setPrevisaoSelecionada] = useState(null);

    useEffect(() => {

        _obterPrevisaoTempo = async ()  => {

            if(!coordenadas) {
                return;
            }

            const { data } = await openWeatherService.get(`forecast?lat=${coordenadas.latitude}&lon=${coordenadas.longitude}`);
            
            console.log(`forecast?lat=${coordenadas.latitude}&lon=${coordenadas.longitude}`);

            setPrevisao(data);
            setPrevisaoSelecionada(data.list[0]);
        }

        _obterPrevisaoTempo();
    }, [coordenadas]);
    
    return (
        <>
            {previsaoSelecionada && (<Modal 
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
                                        {previsao.city.name} - {previsao.city.country}
                                    </Text>
                                    <Text>
                                        {dataHelper.obterDiaSemana()}, {dataHelper.obterHoraAtual()}
                                    </Text>
                                    <Text>
                                        {previsaoSelecionada.weather[0].description}
                                    </Text>
                                </View>

                                <View style={styles.body}>
                                    <Text style={styles.bodyTemperaturaText}>
                                            <Image
                                            style={styles.bodyImage}
                                            source={{uri: `http://openweathermap.org/img/wn/${previsaoSelecionada.weather[0].icon}@2x.png`}}
                                            />
                                            {temperaturaHelper.converterTemperaturaKelvinToCelcius(previsaoSelecionada.main.temp)} 
                                            <Text style={styles.bodyTemperaturaGrausText}>ºC</Text>
                                    </Text>
                                    <Text style={styles.bodyTemperaturaMaxMin}>
                                        Max {temperaturaHelper.converterTemperaturaKelvinToCelcius(previsaoSelecionada.main.temp_max)} º / Min {temperaturaHelper.converterTemperaturaKelvinToCelcius(previsaoSelecionada.main.temp_min)} º
                                    </Text>
                                    <Text>
                                        Humidade: {previsaoSelecionada.main.humidity} %
                                    </Text>  
                                    <Text>
                                        Vento: {(previsaoSelecionada.wind.speed * 3.6).toFixed(2)} km/h
                                    </Text>
                                    <Text>
                                        Pressão: {previsaoSelecionada.main.pressure} hPa                                        
                                    </Text>

                                    <Text style={styles.bodyTemperaturaObservacaoText}>                                        
                                        A temperatura agora é de {temperaturaHelper.converterTemperaturaKelvinToCelcius(previsaoSelecionada.main.temp)} ºC e parece {temperaturaHelper.converterTemperaturaKelvinToCelcius(previsaoSelecionada.main.feels_like)} ºC lá fora. O vento está soprando cerca de {(previsaoSelecionada.wind.speed * 3.6).toFixed(2)} km/h pressão de {previsaoSelecionada.main.pressure} hPa.
                                    </Text>                           
                                </View>

                                <View>
                                  {previsao.list && (previsao.list.map((previsaoItem, index) => (
                                    <Text key={index} style={styles.bodyTemperaturaMaxMin}>
                                      {dataHelper.obterDiaSemanaPorData(previsaoItem.dt)}
                                      <Image
                                            style={styles.iconPrevisao}
                                            source={{uri: `http://openweathermap.org/img/wn/${previsaoItem.weather[0].icon}@2x.png`}}
                                            />
                                      Max {temperaturaHelper.converterTemperaturaKelvinToCelcius(previsaoItem.main.temp_max)} º / Min {temperaturaHelper.converterTemperaturaKelvinToCelcius(previsaoItem.main.temp_min)} º
                                    </Text>
                                    ))
                                  )}
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