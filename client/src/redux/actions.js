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
  ERROR,
  CLEAN_ERROR
} from "./action-types"

import {
  fetchDriverByName,
  fetchDrivers,
  fetchDriversDetail,
  fetchPostDriver,
  fetchTeams,
} from "../services/getData"

export const getDrivers = () => {
  return async (dispatch) => {
    try {
      const drivers = await fetchDrivers()
      dispatch({ type: GET_DRIVERS, payload: drivers })
    } catch (error) {
      console.log(error)
    }
  }
}

export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const driversDetail = await fetchDriversDetail(id)
      dispatch({ type: GET_DETAIL, payload: driversDetail })
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
      const driverByName = await fetchDriverByName(name)
      dispatch({ type: GET_DRIVERS_BY_NAME, payload: driverByName })
    } catch (error) {
      dispatch({ type: ERROR, payload: error.response.data.error })
    }
  }
}

export const getDriverById = (id) => {
  return async (dispatch) => {
    try {
      const driver = await fetchDriversDetail(id)
      return dispatch({ type: GET_DRIVER_BY_ID, payload: driver })
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
      const teams = await fetchTeams()
       dispatch({ type: GET_TEAMS, payload: teams })
    } catch (error) {
      console.log(error)
    }
  }
}

export const postDriver = (newDriver) => {
  return async (dispatch) => {
    try {
      const newDriverPosted = await fetchPostDriver(newDriver)
       dispatch({ type: POST_DRIVER, payload: newDriverPosted })
    } catch (error) {
      console.log(error)
    }
  }
}

export const cleanError = () => {
  return { type: CLEAN_ERROR }
}