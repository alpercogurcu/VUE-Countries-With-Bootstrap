//import Vue from 'vue';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://restcountries.com/v2/"
});

//Vue.prototype.$axios = axiosInstance;

export default axiosInstance;
//module.exports = axiosInstance;