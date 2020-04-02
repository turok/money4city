import { create } from 'apisauce'

import { API_BASE_URL } from '@config/constants'

const handleResponse = async response => {
  if (!response.ok) {
    throw response
  }

  return response.data
}

async function request(path, method, data = null, headers) {
  const api = create({
    baseURL: API_BASE_URL,
    headers: headers
  })

  return api[method](path, data)
    .then(handleResponse)
    .catch(response => {
      console.error(response) // TODO handle error
    })
}

export const getApi = (url, params) => request(url, 'get', params)

export const postApi = (url, params) =>  request(url, 'post', params,  {'Content-Type': 'multipart/form-data'})
