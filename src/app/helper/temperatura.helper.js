const converterTemperaturaKelvinToCelcius = (temp) => {
    return parseFloat((temp - 273.15).toFixed(2))
};

export default  {
    converterTemperaturaKelvinToCelcius
};