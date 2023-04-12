import React, { useState, useEffect, ChangeEvent } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import CountryDisplay from "./components/CountryDisplay"
import countryService from "./services/CountryService";
import { Country } from "./types/Country";

function App() {
  const [search, setSearch] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>();
  const [selectedCountry, setSelectedCountry] = useState<Country>()
  const [matchingCountries, setMatchingCountries] = useState<Country[]>();

  useEffect(() => {
    console.log("Using effect...");
    countryService.getAll().then((countries) => {
      setCountries(countries);
      console.log("Setting countries...");
      console.log(countries);
    });
  }, [search]);

  const searchCountries = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setSelectedCountry(undefined)

    if (countries !== undefined) {
      setMatchingCountries(
        countries.filter((n) =>
          n.name.common.toLowerCase().includes(event.target.value.toLowerCase())
        )
      );
      console.log("Matching countries:");
      console.log(matchingCountries);
    }
  }

  const selectCountry = (country: Country) => {
    setSelectedCountry(country)
  }

  return (
    <>
      <SearchBar search={search} handleSearchChange={searchCountries} />
      <CountryDisplay countries={matchingCountries} selectedCountry={selectedCountry} 
      selectCountry={selectCountry}/>
    </>
  );
}

export default App;
