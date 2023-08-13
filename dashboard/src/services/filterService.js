import axios from "axios"
import { BASE_URL } from "./helper"

export const getAllRegions=()=>{
   return axios.get(BASE_URL+"filter/regions").then(response=>response.data)
}



export const getAllSectors=()=>{
   return axios.get(BASE_URL+"filter/sectors").then(response=>response.data)
}
export const getAllEndYears=()=>{
    return axios.get(BASE_URL+"filter/end_year").then(response=>response.data)
 }
 export const getAllTopics=()=>{
    return axios.get(BASE_URL+"filter/topics").then(response=>response.data)
 }
 export const getAllPests=()=>{
    return axios.get(BASE_URL+"filter/pests").then(response=>response.data)
 }
 export const getAllSources=()=>{
    return axios.get(BASE_URL+"filter/sources").then(response=>response.data)
 }
 export const getAllCountries=()=>{
    return axios.get(BASE_URL+"filter/countries").then(response=>response.data)
 }