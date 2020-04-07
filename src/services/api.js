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


export const createMarker = (data) => {
  const token = localStorage.getItem('token');

  if (!token){
    return Promise.resolve([]);
  }

  const url = `${API_BASE_URL}/admin/businesses`;

  return axios.post(url, data, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  }).then((result) => {
      return result.data;
  });
}
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

export const sendReceipt = (id, phone, receiptFile) => {

  const url = `${API_BASE_URL}/business/${id}/donates`;

  const formData = new FormData();
    formData.append("phone", phone);
    formData.append("receiptFile", receiptFile);

  return axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
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


