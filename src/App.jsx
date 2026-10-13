import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import useWeather from "./hooks/useWeather";

export default function App() {
  const { weather, loading, error, search } = useWeather();
  const [unit, setUnit] = useState("C");

  const [recent, setRecent] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("recentCities")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!weather) return;
    setRecent((prev) =>
      [weather.name, ...prev.filter((c) => c !== weather.name)].slice(0, 5)
    );
  }, [weather]);

  useEffect(() => {
    localStorage.setItem("recentCities", JSON.stringify(recent));
  }, [recent]);

  return (
    <div className="app">
      <h1>Weather App</h1>
      <SearchBar onSearch={search} />
      <button onClick={() => setUnit(unit === "C" ? "F" : "C")}>
        Switch to °{unit === "C" ? "F" : "C"}
      </button>

      {recent.length > 0 && (
        <div className="chips">
          {recent.map((city) => (
            <button className="chip" key={city} onClick={() => search(city)}>
              {city}
            </button>
          ))}
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard weather={weather} unit={unit} />}
    </div>
  );
}