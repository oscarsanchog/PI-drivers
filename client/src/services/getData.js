import { URL_SERVER } from "../utils/URL_SERVER"
import axios from "axios"


export const fetchDrivers = async () => {
    const { data } = await axios(URL_SERVER)
    return data
}

export const fetchDriversDetail = async (id) => {
    const { data } = await axios(`${URL_SERVER}/${id}`)
    return data
}

export const fetchDriverByName = async (name) => {
    const { data } = await axios(`${URL_SERVER}/name?name=${name}`)
    return data
}

export const fetchPostDriver = async (newDriver) => {
    const { data } = await axios.post(URL_SERVER, newDriver)
    return data
}

export const fetchTeams = async () => {
    const { data } = await axios(`${URL_SERVER}/teams`)
    return data
}