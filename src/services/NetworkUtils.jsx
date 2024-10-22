import axios from 'axios'
import moment from 'moment-timezone'

const baseURL = import.meta.env.VITE_API_BASE_URL

// export const socket = socketio.connect(`${baseURL}/v1`, {
//   transports: ['websocket'],
// })

export const instance = axios.create({ baseURL })

export const getCookie = (name) => {
  try {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
  } catch (error) {
    console.log('getCookie', error)
    return null
  }
  return null
}
export const setCookie = (key, value, expiry) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + expiry * 60 * 60 * 1000)
  document.cookie = `${key}=${value};expires=${expires.toUTCString()};path=/`
}
const deleteCookie = (key) => {
  document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`
}
// deleteCookie('tokenWarehouse)
const logout = () => {
  setCookie('tokenWarehouse', null, '-1')
  window.location.href = '/warehouse/login'
}

const getHeader = (type) => {
  const timezone = moment.tz.guess()
  let headers = { authorization: `Bearer ${getCookie('tokenWarehouse')}` }
  switch (type) {
    case 'json': {
      headers = {
        ...headers,
        'Content-Type': 'application/json',
        'Accept-Language': 'en',
        'Time-Zone': timezone,
      }
      break
    }
    case 'form-data': {
      headers = {
        ...headers,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept-Language': 'en',
        'Time-Zone': timezone,
      }
      break
    }
    default:
  }
  return headers
}

export const get = async (endpoint, params, type = 'json', timeout = 60000) => {
  try {
    const headers = getHeader(type)
    const url = `${baseURL}${endpoint}`
    const response = await instance.get(url, { headers, params, timeout })
    return response.data
  } catch (error) {
    if (error.response?.status === 401) logout()
    throw (
      error.response?.data ?? { message: error.message ?? 'Something wrong' }
    )
  }
}

export const post = async (
  endpoint,
  data,
  type = 'json',
  timeout = 60 * 60 * 6000,
  config = {}
) => {
  try {
    const headers = getHeader(type)
    const url = `${baseURL}${endpoint}`

    const response = await instance.post(url, data, {
      headers,
      timeout,
      ...config,
    })
    return response.data
  } catch (error) {
    if (error.response?.status === 401) logout()
    throw (
      error.response?.data ?? { message: error.message ?? 'Something wrong' }
    )
  }
}

export const patch = async (
  endpoint,
  data,
  params,
  type = 'json',
  timeout = 60 * 60 * 6000,
  config = {}
) => {
  try {
    const headers = getHeader(type)
    const url = `${baseURL}${endpoint}`
    const response = await instance.patch(url, data, {
      headers,
      params,
      timeout,
      ...config,
    })
    return response.data
  } catch (error) {
    if (error.response?.status === 401) logout()
    throw (
      error.response?.data ?? { message: error.message ?? 'Something wrong' }
    )
  }
}

export const remove = async (endpoint, data, timeout = 60000) => {
  try {
    const headers = { authorization: `Bearer ${getCookie('tokenWarehouse')}` }
    const url = `${baseURL}${endpoint}`
    const response = await instance.delete(url, { headers, timeout, data })
    return response.data
  } catch (error) {
    if (error.response?.status === 401) logout()
    throw (
      error.response?.data ?? {
        message: error.message ?? 'Something went wrong',
      }
    )
  }
}

export const download = (endpoint, params) => {
  let url = `${baseURL}${endpoint}?token=${getCookie('tokenWarehouse')}`
  if (params) {
    const newParams = { ...params }
    delete newParams.filter
    Object.keys(newParams).forEach((key) => {
      url += `&${key}=${newParams[key] ?? ''}`
    })
  }
  return url
}
