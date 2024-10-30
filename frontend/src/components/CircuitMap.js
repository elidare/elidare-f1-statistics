import React, { useState } from 'react';
import { getCircuits } from '../services/api';

const CircuitMap = () => {
    const [year, setYear] = useState(2020); // TODO
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleData = async () => {
        try {
            const data = { year: year }; 
            const responseData = await getCircuits(data);
      
            setResponse(responseData);
        } catch (err) {
            setError("Failed to get circuits data. Please try again.");
        }
    };

    return (
        <div>
            <button onClick={handleData}>Click me</button>
            <div>
                {response && <p>Data: {JSON.stringify(response)}</p>}
                {error && <p>{error}</p>}
            </div>
        </div>
    )
};

export default CircuitMap;