import { useEffect } from "react";
import { useState } from "react";
import { getAllCountries } from "./services/countries";
import { fetchWeather } from "./services/weather";

function App() {
  const [countries, setCountries] = useState(null);
  const [country, setCountry] = useState("");
  const [countriesFiltered, setCountriesFiltered] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getAllCountries().then((resCountries) => setCountries(resCountries));
  }, []);

  useEffect(() => {
    if (!country) {
      setCountriesFiltered([]);
      return;
    } else {
      const cFiltered = countries?.filter((coun) =>
        coun.name.common.toLowerCase().includes(country)
      );
      setCountriesFiltered(cFiltered);
    }
  }, [country]);

  useEffect(() => {
    if (countriesFiltered.length === 0) return;
    if (countriesFiltered.length > 1) return;
    fetchWeather(countriesFiltered[0]?.name.common).then((data) => {
      setWeather(data);
    });
  }, [countriesFiltered]);

  const handleSetCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleShow = (name) => {
    setCountry(name);
  };

  if (!countries) return null;

  if (countriesFiltered.length > 10) {
    return (
      <div>
        <p>Find Countries</p>
        <input type="text" value={country} onChange={handleSetCountry} />
        <p>Too many matches, specify another filter</p>
      </div>
    );
  }

  if (countriesFiltered.length <= 10 && countriesFiltered.length > 1) {
    return (
      <div>
        <p>Find Countries</p>
        <input type="text" value={country} onChange={handleSetCountry} />

        <div>
          {countriesFiltered.map((coun) => (
            <li key={coun.name.common}>
              {coun.name.common}{" "}
              <button
                onClick={() => handleShow(coun.name.common.toLowerCase())}
              >
                show
              </button>
            </li>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p>Find Countries</p>
      <input type="text" value={country} onChange={handleSetCountry} />

      <div>
        {countriesFiltered.map((coun) => (
          <div key={coun.name.common}>
            <h1>{coun.name.common}</h1>
            <p>Capital {coun.capital}</p>
            <p>Area {coun.area}</p>

            <h3>Languages</h3>
            <ul>
              {Object.entries(coun.languages).map(([key, value]) => (
                <li key={key}>{value}</li>
              ))}
            </ul>

            <img src={coun.flags.svg} width={100} alt={coun.flags.alt} />

            <h2>Weather in {coun.name.common}</h2>
            <p>Temperture {weather?.main.temp} Celcius</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
              alt="weather"
            />
            <p>Wind {weather?.wind.speed} m/s</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
