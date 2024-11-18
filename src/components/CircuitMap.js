import React, { useEffect, useState } from 'react';
import { getCircuits } from '../services/api';
import WorldMap from './Map.js'
import './CircuitMap.css';

const CircuitMap = () => {
    const [year, setYear] = useState("2024"); // TODO magic number
    const [error, setError] = useState(null);
    const [circuits, setCircuits] = useState(null);

    const handleChange = (event) => {
        setYear(event.target.value);
    };

    useEffect(() => {
        const getCircuitsData = async (year) => {
            try {
                const responseData = await getCircuits(year);
                const circuitsData = responseData.MRData.CircuitTable.Circuits.map((item) => {
                    return { name: item.circuitName, country: item.Location.country, lat: item.Location.lat, long: item.Location.long }
                });
                setCircuits(circuitsData);
            } catch (err) {
                console.log(err)
                setError("Failed to get circuits data. Please try again.");
            }
        };

        if (!year) {
            return;
        }

        let parsed_year = parseInt(year);

        if (parsed_year >= 1950 && parsed_year <= 2024) { // TODO magic numbers
            getCircuitsData(parsed_year);
        };
    }, [year]);

    return (
        <div>
            <form>
                <div class="input-containter">
                    <label for="yearNumber">Pick a year from 1950 to 2024:&nbsp;</label>
                    <input
                        id="yearNumber"
                        type="number"
                        value={year}
                        onChange={handleChange}
                        min="1950"
                        max="2024"
                        required
                    />
                </div>
            </form>
            <div>
                {circuits && <WorldMap points={circuits} />}
                {error && <p>{error}</p>}
            </div>
        </div>
    )
};

export default CircuitMap;
