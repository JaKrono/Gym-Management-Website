import axios, { type AxiosResponse } from 'axios'
const client = axios.create({baseURL:'http://localhost:8000/'});
client.interceptors.response.use((value:any)=>{
    return Promise.resolve(value) as any    
}, (value:any)=>{
    return Promise.resolve(value.response)
})

export default client;
export function setToken(token:string){
    client.defaults.headers.common['Authorization'] = token;
}