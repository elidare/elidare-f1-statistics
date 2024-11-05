import axios from 'axios';

// TODO move to variables?
const options = {
  host: 'ergast.com',
  path: '/api/f1/',
  circuits: '/circuits.json'
}

// Create an Axios instance with a base URL
const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
});


// Get circuits by year
export const getCircuits = async (year) => {
    // TODO check year to be correct
    try {
      const response = await api.get(`https://${options.host}${options.path}${year}${options.circuits}`);
  
      return response.data;
    } catch (error) {
      console.error('Error in /circuits:', error);
      throw error;
    }
};

