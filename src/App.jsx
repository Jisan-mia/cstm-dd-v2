import { useState } from "react";
import "./App.css";
import CustomDropdown from "./components/CustomDropdown2/CustomDropdown";
import data from "./data/countries.json";

function transformDataToAppropriateFormat() {
  return data.map((country) => {
    return {
      ...country,
      value: country.name.toLowerCase(),
      label: country.name,
    };
  });
}
const App = () => {
  const [isMulti, setIsMulti] = useState(false);
  const [isSearchable, setIsSearchable] = useState(false);
  const [value, setValue] = useState(null)

  console.log(value)
  return (
    <div className="container">
      <div className="feature-area">
        <label htmlFor="searchable">
          isSearchable
          <input
            type="checkbox"
            name="searchable"
            id="searchable"
            checked={isSearchable}
            onChange={() => setIsSearchable(!isSearchable)}
          />
        </label>
        <label htmlFor="multi">
          isMulti
          <input
            type="checkbox"
            name="multi"
            id="multi"
            checked={isMulti}
            onChange={() => setIsMulti(!isMulti)}
          />
        </label>
      </div>
      <CustomDropdown
        placeholder="Select Country.."
        options={transformDataToAppropriateFormat()}
        isMulti={isMulti}
        isSearchable={isSearchable}
        onChange={(v) => {
          setValue(v)
        }}
      />

      
    </div>
  );
};

export default App;
