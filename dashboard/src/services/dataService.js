import axios from 'axios'
import { BASE_URL } from './helper'

export const getAllFields=(filter={})=>{
    return axios.post(BASE_URL+"data/",filter).then(response=>response.data)
}