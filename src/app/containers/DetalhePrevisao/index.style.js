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
    flexDirection: "row"
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  body: {
    flexDirection: "row"
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
  }
});

const buttons = styles.create({
  buttonFavoritar: {}
});

export { styles, buttons }