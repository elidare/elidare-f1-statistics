import React, { useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { getDriversStandings } from '../services/api';
import Chart from './StandingsChart.js'
import './Input.css';


const DriversStandings = () => {
    const [year, setYear] = useState("2024"); // TODO magic number
    const [error, setError] = useState(null);
    const [drivers, setDrivers] = useState(null);
    // This page has loader because the data fetching lasts several seconds
    const [loading, setLoading] = useState(false); // New loading state.

    const handleChange = (event) => {
        setYear(event.target.value);
    };

    useEffect(() => {
        const getDriversStandingsData = async (year) => {
            setLoading(true); // Set loading to true at the start of data fetching
            setError(null);   // Reset any previous errors
            try {
                const responseData = await getDriversStandings(year);
                const driversData = responseData.MRData.StandingsTable.StandingsLists[0].DriverStandings.map((item) => {
                    return {
                        position: parseInt(item.position),
                        points: parseInt(item.points),
                        wins: parseInt(item.wins),
                        driver: `${item.position}. ${item.Driver.givenName} ${item.Driver.familyName}`
                    }
                });
                setDrivers(driversData);
            } catch (err) {
                setError("Failed to get circuits data. Please try again.");
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        if (!year) {
            return;
        }

        let parsed_year = parseInt(year);

        if (parsed_year >= 1950 && parsed_year <= 2024) { // TODO magic numbers
            getDriversStandingsData(parsed_year);
        };
    }, [year]);

    return (
        <div>
            <form>
                <div class="input-containter">
                    <label for="yearNumberDrivers">
                        This chart shows drivers' points and wins in every season from 1950 to 2024:&nbsp;
                    </label>
                    <input
                        id="yearNumberDrivers"
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
                {loading && <div class="loader-overlay"><ClipLoader/></div>} {/* Show loader when loading */}
                {drivers && !loading && <Chart data={drivers} />}
                {error && <p>{error}</p>}
            </div>
        </div>
    )
};

export default DriversStandings;