/*****************************
* environment.js
* path: '/environment.js' (root of your project)
******************************/

import Constants from "expo-constants";

const ENV = {
 dev: {
    openWeatherMapAppId: "2120f476f5a86e27745922aaef868f87"
 },
 staging: {
    openWeatherMapAppId: "2120f476f5a86e27745922aaef868f87"
 },
 prod: {
    openWeatherMapAppId: "2120f476f5a86e27745922aaef868f87"
 }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
 // What is __DEV__ ?
 // This variable is set to true when react-native is running in Dev mode.
 // __DEV__ is true when run locally, but false when published.
 if (__DEV__) {
   return ENV.dev;
 } else if (env === 'staging') {
   return ENV.staging;
 } else if (env === 'prod') {
   return ENV.prod;
 }
};

export default getEnvVars;