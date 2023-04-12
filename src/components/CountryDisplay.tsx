import { useState } from "react";
import { Country } from "@/types/Country";
import { Weather } from "@/types/Weather"
import weatherService from "../services/WeatherService"

type Props = {
  countries: Country[] | undefined
  selectedCountry: Country | undefined
  selectCountry: (country: Country) => void
};

const CountryDisplay = ({ countries, selectedCountry, selectCountry }: Props) => {

  const [currentCountryWeather, setCurrentCountryWeather] = useState<Weather>()

  // If undefined, don't display anything
  if (countries === undefined) return <></>;

  // If there is only 1 country in the list or if a country was selected, display the country
  if (countries.length === 1 || selectedCountry !== undefined) {

    const country = (selectedCountry !== undefined ? selectedCountry : countries[0])

    weatherService.getWeather(country.latlng[0], country.latlng[1])
    .then((returnedWeather) => {
      setCurrentCountryWeather(returnedWeather)
    })

    return (
      <>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>
        <p>Languages:</p>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li>{language}</li>
          ))}
        </ul>
        <h1>{country.flag}</h1>
        <p>Temperature: {currentCountryWeather && Math.round(currentCountryWeather.current.temp - 273.15)} C</p>
      </>
    );
  }

  // If more than 10, tell em get more specific
  if (countries.length > 10)
    return <div>Too many matches, specify another filter</div>;

  // Else, return the list of countries
  return (
    <ul>
      {countries.map((country) => (
        <li>
          {country.name.common}
          <button onClick={() => selectCountry(country)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

export default CountryDisplay;
