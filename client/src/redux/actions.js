import { GET_DRIVERS } from "./action-types";
import axios from 'axios'
import { URL_SERVER } from "../utils/consts";

export const getDrivers =  () => {
    return async (dispatch) => {
        const { data } = await axios(URL_SERVER)
        return dispatch({ type: GET_DRIVERS, payload: data })
    }
}