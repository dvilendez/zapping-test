import axios from 'axios'
const baseUrl = process.env.REACT_APP_BASE_HOST;
const service = 'login'

export const setAuthToken = (token) => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/${service}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response);

    const { token } = response.data;

    setAuthToken(token);

    return {
      ok: true
    };
  } catch (error) {
    return {
      ok: false
    }
  }
}

export const status = async () => {
  try {
    const response = await axios.get(`${baseUrl}/${service}/status`);
    console.log(response)
    if (response.status === 200) {
      return {
        ok: true
      }
    }
  } catch (error) {
    console.error(error);
  }
  return {
    ok: false
  }
}
