import React, { useEffect, useState } from "react";
import { getCircuits } from "../services/api";
import WorldMap from "./Map.js";
import YearInput from "./YearInput.js";
import { MIN_YEAR, MAX_YEAR, DEFAULT_YEAR } from "../utils/constants";

const CircuitMap = () => {
  const [year, setYear] = useState(DEFAULT_YEAR.toString());
  const [error, setError] = useState(null);
  const [circuits, setCircuits] = useState(null);

  useEffect(() => {
    const getCircuitsData = async (year) => {
      try {
        const responseData = await getCircuits(year);
        const circuitsData = responseData.MRData.CircuitTable.Circuits.map(
          (item) => {
            return {
              name: item.circuitName,
              country: item.Location.country,
              lat: item.Location.lat,
              long: item.Location.long,
            };
          },
        );
        setCircuits(circuitsData);
      } catch (err) {
        setError("Failed to get circuits data. Please try again.");
      }
    };

    if (!year) {
      return;
    }

    let parsed_year = parseInt(year);

    if (parsed_year >= MIN_YEAR && parsed_year <= MAX_YEAR) {
      getCircuitsData(parsed_year);
    }
  }, [year]);

  return (
    <div>
      <YearInput
        year={year}
        minYear={MIN_YEAR}
        maxYear={MAX_YEAR}
        onChange={setYear}
      />
      <div>
        {circuits && <WorldMap points={circuits} />}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default CircuitMap;
