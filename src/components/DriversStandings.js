import React, { useEffect, useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { getDriversStandings } from '../services/api';
import Chart from './StandingsChart.js'
import './Input.css';
import { MIN_YEAR, MAX_YEAR, DEFAULT_YEAR } from '../utils/constants';


const DriversStandings = () => {
    const [year, setYear] = useState(DEFAULT_YEAR.toString());
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
                        points: parseInt(item.points),
                        wins: parseInt(item.wins),
                        name: `${item.position || item.positionText}. ${item.Driver.givenName} ${item.Driver.familyName}`
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

        if (parsed_year >= MIN_YEAR && parsed_year <= MAX_YEAR) {
            getDriversStandingsData(parsed_year);
        };
    }, [year]);

    return (
        <div>
            <form>
                <div class="input-containter">
                    <label for="yearNumberDrivers">
                        This chart shows drivers' points and wins in the selected season from {MIN_YEAR} to {MAX_YEAR}:&nbsp;
                    </label>
                    <input
                        id="yearNumberDrivers"
                        type="number"
                        value={year}
                        onChange={handleChange}
                        min={MIN_YEAR}
                        max={MAX_YEAR}
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
