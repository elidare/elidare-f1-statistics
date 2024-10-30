import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
    baseURL: '/api', // Replace with your actual API base URL
    headers: {
      'Content-Type': 'application/json',
    },
});


// Function to send a POST request
// Get circuits by year
export const getCircuits = async (data) => {
    try {
      // Make the POST request with the provided data
      const response = await api.post('/circuits', data);
  
      // Return the JSON data from the response
      return response.data;
    } catch (error) {
      console.error('Error in /circuits:', error);
      throw error;
    }
};

