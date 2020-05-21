const obterDiaSemana = () => {
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
};

const obterHoraAtual = () => {
    var d = new Date();
    return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`
};

const converterTemperaturaCelcius = (temp) => {
    return parseFloat((temp - 273.15).toFixed(2))
};

export default  {
    obterDiaSemana,
    obterHoraAtual,
    converterTemperaturaCelcius
};