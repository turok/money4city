import { create } from 'apisauce'
import axios from 'axios';

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

export const getInactiveMarkers = () => {
  const token = localStorage.getItem('token');

  if (!token){
    return Promise.resolve([]);
  }

  const url = `${API_BASE_URL}/admin/businesses`;

  return axios.get(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then((result) => {
      return result.data;
  });
}

export const getActiveMarkers = () => {
  const url = `${API_BASE_URL}/businesses`;

  return axios.get(url, {
  }).then((result) => {
      return result.data;
  });
}

export const confirmMarker = (id) => {
  const token = localStorage.getItem('token');

  if (!token){
    return Promise.resolve([]);
  }

  const url = `${API_BASE_URL}/admin/businesses/${id}/approve`;

  return axios.post(url, null, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then((result) => {
      return result.data;
  });
}


