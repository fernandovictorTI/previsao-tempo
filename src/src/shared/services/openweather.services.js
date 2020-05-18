import axios from 'axios';

import getEnvVars from '../../../environment';
const { openWeatherMapAppId } = getEnvVars();

const api = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/"
});

api.interceptors.request.use(async (config) => {
    config.params = config.params || {};
    config.params.APPID = openWeatherMapAppId;
    config.params.lang = "pt_br";
    return config;
});

export default api;