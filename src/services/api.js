import axios from 'axios';

const options = {
    host: 'api.jolpi.ca',
    path: '/ergast/f1/',
    circuits: '/circuits.json',
    driverStandings: '/driverStandings.json',
    constructorStandings: '/constructorStandings.json'
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
    try {
        const response = await api.get(`https://${options.host}${options.path}${year}${options.circuits}`);
    
        return response.data;
    } catch (error) {
        console.error('Error in /circuits:', error);
        throw error;
    }
};

// Get drivers standings by year
export const getDriversStandings = async (year) => {
    try {
        const response = await api.get(`https://${options.host}${options.path}${year}${options.driverStandings}`);

        return response.data;
    } catch (error) {
        console.error('Error in /driversStandings:', error);
        throw error;
    }
};

// Get constructors standings by year
export const getConstructorsStandings = async (year) => {
    try {
        const response = await api.get(`https://${options.host}${options.path}${year}${options.constructorStandings}`);

        return response.data;
    } catch (error) {
        console.error('Error in /constructorStandings:', error);
        throw error;
    }
};
