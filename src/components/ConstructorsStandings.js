import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { getConstructorsStandings } from "../services/api";
import Chart from "./StandingsChart.js";
import YearInput from "./YearInput.js";
import {
  MIN_CONSTRUCTOR_YEAR,
  MAX_YEAR,
  DEFAULT_YEAR,
} from "../utils/constants";

const ConstructorsStandings = () => {
  const [year, setYear] = useState(DEFAULT_YEAR.toString());
  const [error, setError] = useState(null);
  const [constructors, setConstructors] = useState(null);
  // This page has loader because the data fetching lasts several seconds
  const [loading, setLoading] = useState(false); // New loading state.

  useEffect(() => {
    const getConstructorsStandingsData = async (year) => {
      setLoading(true); // Set loading to true at the start of data fetching
      setError(null); // Reset any previous errors
      try {
        const responseData = await getConstructorsStandings(year);
        const constructorsData =
          responseData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(
            (item) => {
              return {
                points: parseInt(item.points),
                wins: parseInt(item.wins),
                name: `${item.position || item.positionText}. ${item.Constructor.name}`,
              };
            },
          );
        setConstructors(constructorsData);
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

    if (parsed_year >= MIN_CONSTRUCTOR_YEAR && parsed_year <= MAX_YEAR) {
      getConstructorsStandingsData(parsed_year);
    }
  }, [year]);

  return (
    <div>
      <YearInput
        year={year}
        minYear={MIN_CONSTRUCTOR_YEAR}
        maxYear={MAX_YEAR}
        onChange={setYear}
      />
      <div>
        {loading && (
          <div class="loader-overlay">
            <ClipLoader />
          </div>
        )}{" "}
        {/* Show loader when loading */}
        {constructors && !loading && <Chart data={constructors} />}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default ConstructorsStandings;
