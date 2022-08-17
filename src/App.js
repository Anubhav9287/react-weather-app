import './App.css';
import Search from './components/search/serach';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import { useState } from 'react';

function App() {

  const [currentWeatherFetch, setCurrentWeather] = useState(null);
  const [forcastFetch, setForcast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forcastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    Promise.all([currentWeatherFetch, forcastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForcast({ city: searchData.label, ...forcastResponse })
      })
      .catch((err) => console.log(err));
  }

  console.log(currentWeatherFetch);
  console.log(forcastFetch);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeatherFetch && <CurrentWeather data={currentWeatherFetch} />}
      {forcastFetch && <Forecast data={forcastFetch} />}
    </div>
  );
}

export default App;