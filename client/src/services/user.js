import axios from 'axios'
const baseUrl = process.env.REACT_APP_BASE_HOST;
const service = 'user'

export const create = (data) => {
  return axios.post(`${baseUrl}/${service}/create`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
