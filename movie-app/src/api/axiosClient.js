import axios from 'axios';
import queryString from 'query-string';

import apiConfig from './apiConfig';

const axiosClient = axios.create({
    baseURL:apiConfig.baseUrl,
    headers:{
        'Content-Type':'Application/json'
    },
    paramsSerializer: param => queryString.stringify({...param,api_key:apiConfig.apiKey})
});


//axiosClient.interceptors.request.use(async(config)=>config);
axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use((res)=>{
    if(res && res.data){
        return res.data;
    }
    return res;
},(error)=>{
    throw error;
});

export default axiosClient;