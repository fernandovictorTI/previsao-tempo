import React from 'react';
import { Text, Image, FlatList } from 'react-native';
import dataHelper from '../../helper/data.helper';
import temperaturaHelper from '../../helper/temperatura.helper';
import { Card } from 'react-native-elements';
import { styles } from './previsaoproximosdias.component.style';

const RenderCard = ({previsaoItem}) => {
    return (
        <Card
            title={dataHelper.obterDiaSemanaPorData(previsaoItem.dt_txt)}
            containerStyle={{ padding: 0, width: 100, alignContent: "center", alignItems: "center"  }}
        >                                          
            <Image
                style={styles.iconPrevisao}
                source={{uri: `http://openweathermap.org/img/wn/${previsaoItem.weather[0].icon}@2x.png`}}
                />
            <Text style={styles.bodyTemperaturaMaxMin}>
                Max {temperaturaHelper.converterTemperaturaKelvinToCelcius(previsaoItem.main.temp_max)} º / Min {temperaturaHelper.converterTemperaturaKelvinToCelcius(previsaoItem.main.temp_min)} º
            </Text>
        </Card>
    );
}

const PrevisaoProximosDiasListComponent = ({previsoes}) => {

    return (
        <FlatList 
            data={previsoes}
            horizontal
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            removeClippedSubviews={false}
            enableEmptySections={false}
            legacyImplementation={true}
            renderItem={({ item: previsaoItem }) => <RenderCard previsaoItem={previsaoItem} />}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

export default PrevisaoProximosDiasListComponent;