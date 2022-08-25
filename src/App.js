import { useState } from 'react';
import { CURRENT_WEATHER_URL, WEATHER_API_KEY } from './api';
import './App.css';
import CurrentWeather from './components/current-weather/CurrentWeather';
import Forecast from './components/forecast/Forecast';
import Header from './components/Header/Header';
import Search from './components/search/Search';

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, long] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${CURRENT_WEATHER_URL}/weather?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${CURRENT_WEATHER_URL}/forecast?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecastWeather({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  }

  return (
      <div className="container">
      <Header />
      <Search onSearchChange={handleOnSearchChange} />
      {
        currentWeather && <CurrentWeather data={currentWeather} />
      }
      {
        forecastWeather && <Forecast data={forecastWeather} />
      }
      </div>
  );
}

export default App;
