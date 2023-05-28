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

  return (
    <>
      <CustomDropdown
        placeholder="Select Country.."
        options={transformDataToAppropriateFormat()}
        // isMulti
        isSearchable
        onChange={(value) => console.log(value)}
      />
    </>
  );
};

export default App;
