import React, { useEffect, useState } from 'react';
import { getCircuits } from '../services/api';
import WorldMap from './Map.js'

const CircuitMap = () => {
    const [year, setYear] = useState(2024); // TODO magic number
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [circuits, setCircuits] = useState(null)

    const handleChange = (event) => {
        const value = event.target.value;
        // TODO fix it all
        if (1950 <= value <= 2024) { // TODO magic numbers
            console.log(value);
            setYear(event.target.value);
        };
    };

    // const handleData = async (event) => {
    //     event.preventDefault(); // Prevent page reload
    //     if (year === "") {
    //         return;
    //     }

    //     try {
    //         const responseData = await getCircuits(year);
    //         const circuitsData = responseData.MRData.CircuitTable.Circuits.map((item) => {
    //             return { name: item.circuitName, lat: item.Location.lat, long: item.Location.long }
    //         });
    //         setCircuits(circuitsData);
    //         setResponse(responseData); // TODO make it shown !

    //         console.log(circuitsData);
    //     } catch (err) {
    //         setError("Failed to get circuits data. Please try again.");
    //     }
    // };

    useEffect(() => {
        console.log('Try fetch', year);
        try {
            const responseData = getCircuits(year);
            const circuitsData = responseData.MRData.CircuitTable.Circuits.map((item) => {
                return { name: item.circuitName, lat: item.Location.lat, long: item.Location.long }
            });
            setCircuits(circuitsData);
            setResponse(responseData); // TODO make it shown !

            console.log(circuitsData);
        } catch (err) {
            console.log(err)
            setError("Failed to get circuits data. Please try again.");
        }
    }, [year]);

    /*
[
    {"circuitId":"bremgarten","url":"http://en.wikipedia.org/wiki/Circuit_Bremgarten","circuitName":"Circuit Bremgarten","Location":{"lat":"46.9589",long: "7.40194","locality":"Bern","country":"Switzerland"}},
    {"circuitId":"indianapolis","url":"http://en.wikipedia.org/wiki/Indianapolis_Motor_Speedway","circuitName":"Indianapolis Motor Speedway","Location":{"lat":"39.795",long: "-86.2347","locality":"Indianapolis","country":"USA"}},
    {"circuitId":"monaco","url":"http://en.wikipedia.org/wiki/Circuit_de_Monaco","circuitName":"Circuit de Monaco","Location":{"lat":"43.7347",long: "7.42056","locality":"Monte-Carlo","country":"Monaco"}},
    {"circuitId":"monza","url":"http://en.wikipedia.org/wiki/Autodromo_Nazionale_Monza","circuitName":"Autodromo Nazionale di Monza","Location":{"lat":"45.6156",long: "9.28111","locality":"Monza","country":"Italy"}},
    {"circuitId":"reims","url":"http://en.wikipedia.org/wiki/Reims-Gueux","circuitName":"Reims-Gueux","Location":{"lat":"49.2542",long: "3.93083","locality":"Reims","country":"France"}},
    {"circuitId":"silverstone","url":"http://en.wikipedia.org/wiki/Silverstone_Circuit","circuitName":"Silverstone Circuit","Location":{"lat":"52.0786",long: "-1.01694","locality":"Silverstone","country":"UK"}},
    {"circuitId":"spa","url":"http://en.wikipedia.org/wiki/Circuit_de_Spa-Francorchamps","circuitName":"Circuit de Spa-Francorchamps","Location":{"lat":"50.4372",long: "5.97139","locality":"Spa","country":"Belgium"}}]}}}
    */
    // const points = [
    //     { lat: 46.9589, long: 7.40194 },
    //     { lat: 39.795, long: -86.2347 },
    //     { lat: 43.7347, long: 7.42056 },
    //     { lat: 49.2542, long: 3.93083 },
    //     { lat: 49.2542, long: 3.93083 },
    //     { lat: 52.0786, long: -1.01694 },
    //     { lat: 50.4372, long: 5.97139 },
    // ];

    return (
        <div>
            <form>
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
                {circuits && <WorldMap points={circuits} />}
                {response && <p>Data: {JSON.stringify(response)}</p>}
                {error && <p>{error}</p>}
            </div>
        </div>
    )
};

export default CircuitMap;
