import React, { useEffect, useState } from "react";
import { Text, Image, FlatList, TouchableOpacity } from "react-native";
import dataHelper from "../../helper/data.helper";
import temperaturaHelper from "../../helper/temperatura.helper";
import { Card } from "react-native-elements";
import { styles } from "./previsaoproximosdias.component.style";
import moment from "moment";
import "moment/locale/pt-br";
import _ from "lodash";

const RenderCard = ({ previsaoItem, onEscolherPrevisao }) => {
  return (
    <TouchableOpacity>
      <Card
        title={dataHelper.obterDiaSemanaPorData(previsaoItem.dt_txt)}
        containerStyle={{
          padding: 0,
          width: 100,
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={styles.iconPrevisao}
          source={{
            uri: `http://openweathermap.org/img/wn/${previsaoItem.weather[0].icon}@2x.png`,
          }}
        />
        <Text style={styles.bodyTemperaturaMaxMin}>
          Max{" "}
          {temperaturaHelper.converterTemperaturaKelvinToCelcius(
            previsaoItem.main.temp_max
          )}{" "}
          º / Min{" "}
          {temperaturaHelper.converterTemperaturaKelvinToCelcius(
            previsaoItem.main.temp_min
          )}{" "}
          º
        </Text>
      </Card>
    </TouchableOpacity>
  );
};

const PrevisaoProximosDiasListComponent = ({
  previsoes,
  onEscolherPrevisao,
}) => {
  const [previsoesAgrupadas, setPrevisoesAgrupadas] = useState([]);

  useEffect(() => {
    if (!previsoes) return;

    const previsoesMaped = previsoes.map((previsao) => {
      moment.locale("pt-br");
      const dia = moment(previsao.dt_txt, "YYYY-MM-DD HH:mm:ss").format("L");
      return {
        ...previsao,
        dia,
      };
    });

    const prevAgrupados = _(previsoesMaped)
      .groupBy("dia")
      .map((prevs, dia) => {
        return {
          ...prevs[0],
        };
      });
      
    setPrevisoesAgrupadas(previsoes);
  }, [previsoes]);

  return (
    <>
      {previsoesAgrupadas && (
        <FlatList
          data={previsoesAgrupadas}
          horizontal
          showsHorizontalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          removeClippedSubviews={false}
          enableEmptySections={false}
          legacyImplementation={true}
          renderItem={({ item: previsaoItem }) => (
            <RenderCard
              previsaoItem={previsaoItem}
              onEscolherPrevisao={onEscolherPrevisao}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </>
  );
};

export default PrevisaoProximosDiasListComponent;
