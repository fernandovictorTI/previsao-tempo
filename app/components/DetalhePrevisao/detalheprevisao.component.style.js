import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  card: {                       
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
  header: {
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  body: {
  },
  footer: {
    paddingTop: 50
  },
  bodyTemperaturaText: {
    fontSize: 50,
    textAlign: "center"
  },
  bodyTemperaturaGrausText: {
    fontSize: 20,
    textAlignVertical: "top"
  },
  bodyTemperaturaObservacaoText: {
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: "justify"
  },
  bodyImage: {
    width: 100,
    height: 100
  },
  bodyTemperaturaMaxMin: {
    textAlign: "center",
    fontSize: 6,
    marginBottom: 10
  },
  iconPrevisao:{
    width: 70,
    height: 70
  },
  tituloCardPrevisao: {
    textAlign: "center",
  }
});

const buttons = StyleSheet.create({
  buttonFavoritar: {}
});

export { styles, buttons }