import "./Input.css";

const YearInput = ({ year, minYear, maxYear, onChange }) => {
  return (
    <form>
      <div className="input-container">
        <label htmlFor="yearNumber">
          Select a season from {minYear} to {maxYear}:
        </label>
        <input
          id="yearNumber"
          type="number"
          value={year}
          onChange={(event) => onChange(event.target.value)}
          min={minYear}
          max={maxYear}
          required
        />
      </div>
    </form>
  );
};

export default YearInput;
