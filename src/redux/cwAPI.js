import axios from 'axios'

// const baseUrl = 'https://api.cloudwaiver.com'
const baseUrl = 'http://192.168.1.36:3000'
// http://192.168.1.22:8000
const cwAPI = axios

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('cw-access-token')
      config.headers['Authorization'] = 'Bearer ' + token
      config.headers['X-TENANT-ID'] = getDynamicTenantId();
    return config
  },
  error => {
    Promise.reject(error)
  }
)

window.http = cwAPI

export const postRequest = (url, body) => {
  return cwAPI.post(`${baseUrl}${url}`, body)
}

export const getRequest = (url) => {
  return cwAPI.get(`${baseUrl}${url}`)
}

export const putRequest = (url, body) => {
  return cwAPI.put(`${baseUrl}${url}`, body)
}

export const deleteRequest = (url, body) => {
  return cwAPI.delete(`${baseUrl}${url}`, body)
}

export const patchRequest = (url, body) => {
  return cwAPI.patch(`${baseUrl}${url}`, body)
}

//extract X_tan id
export function getDynamicTenantId() {
  const currentURL = window.location.href;
  const urlParts = currentURL.split('.');
  if (urlParts[0].includes('https')) {
    return urlParts[0].replace('https://', '');
  }
  return urlParts[0].replace('http://', '');
}

export default cwAPI
