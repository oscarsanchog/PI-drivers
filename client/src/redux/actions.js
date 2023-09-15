import {
  GET_DRIVERS,
  GET_DETAIL,
  CLEAN_DETAIL,
  GET_DRIVERS_BY_NAME,
  GET_DRIVER_BY_ID,
  CLEAN_DRIVERS_FILTERED,
  ORDER_BY_NAME,
  ORDER_BY_DOB,
  FILTER_BY_ORIGIN,
  FILTER_BY_TEAM,
  GET_TEAMS,
  POST_DRIVER,
} from "./action-types"

import axios from "axios"
const URL_SERVER = "http://localhost:3001/drivers"

export const getDrivers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(URL_SERVER)
      return dispatch({ type: GET_DRIVERS, payload: data })
    } catch (error) {
      console.log(error)
    }
  }
}

export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL_SERVER}/${id}`)
      return dispatch({ type: GET_DETAIL, payload: data })
    } catch (error) {
      console.log(error)
    }
  }
}

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL }
}

export const getDriversByName = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL_SERVER}/name?name=${name}`)
      return dispatch({ type: GET_DRIVERS_BY_NAME, payload: data })
    } catch (error) {
      window.alert(error.response.data.message)
    }
  }
}

export const getDriverById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL_SERVER}/${id}`)
      return dispatch({ type: GET_DRIVER_BY_ID, payload: data })
    } catch (error) {
      console.log(error)
    }
  }
}

export const cleanDriversFiltered = () => {
  return { type: CLEAN_DRIVERS_FILTERED }
}

export const orderByName = (sort) => {
  //console.log(sort);
  return { type: ORDER_BY_NAME, payload: sort }
}

export const orderByDob = (sort) => {
  return { type: ORDER_BY_DOB, payload: sort }
}

export const filterByOrigin = (origin) => {
  return { type: FILTER_BY_ORIGIN, payload: origin }
}

export const filterByTeam = (team) => {
  return { type: FILTER_BY_TEAM, payload: team }
}

export const getTeams = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`${URL_SERVER}/teams`)
      return dispatch({ type: GET_TEAMS, payload: data })
    } catch (error) {
      console.log(error)
    }
  }
}

export const postDriver = (newDriver) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(URL_SERVER, newDriver)
      return dispatch({ type: POST_DRIVER, payload: data })
    } catch (error) {
      console.log(error)
    }
  }
}

/* export const getDrivers = (newDriver) => {
  return async (dispatch) => {
    const { data } = await axios(URL_SERVER)
    return dispatch({ type: GET_DRIVERS, payload: data })
  }
} */
