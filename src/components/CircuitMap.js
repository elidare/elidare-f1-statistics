import React, { useState } from 'react';
import { getCircuits } from '../services/api';

const CircuitMap = () => {
    const [year, setYear] = useState(2024); // TODO magic number
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        setYear(event.target.value);
    };

    const handleData = async (event) => {
        event.preventDefault(); // Prevent page reload
        if (year === "") {
            return;
        }

        try {
            const responseData = await getCircuits(year);
            setResponse(responseData);
        } catch (err) {
            setError("Failed to get circuits data. Please try again.");
        }
    };

    return (
        <div>
            <form onSubmit={handleData}>
                <label>
                    Pick a year from 1950 to 2024:
                    <input
                        type="number"
                        value={year}
                        onChange={handleChange}
                        min="1950"
                        max="2024"
                        required
                    />
                </label>
                <button type="submit">Click me</button>
            </form>
            <div>
                {response && <p>Data: {JSON.stringify(response)}</p>}
                {error && <p>{error}</p>}
            </div>
        </div>
    )
};

export default CircuitMap;
