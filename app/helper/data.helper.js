import moment from 'moment';
import 'moment/locale/pt-br';

const obterDiaSemana = () => {
    moment.locale('pt-br');
    const now = moment();
    return now.format('dddd');
};

const obterHoraAtual = () => {
    moment.locale('pt-br');
    const now = moment();
    return now.format('HH:mm');
};

const obterDiaSemanaPorData = (data)  => {
    moment.locale('pt-br');
    const dataMoment = moment(data, "YYYY-MM-DD HH:mm:ss");
    return dataMoment.format('ddd');
}

export default  {
    obterDiaSemana,
    obterHoraAtual,
    obterDiaSemanaPorData
};