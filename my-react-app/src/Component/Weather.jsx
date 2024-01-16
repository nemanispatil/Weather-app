import React,{useState} from 'react'
import './Weather.css'; 

function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  function handle(e) {
    setCity(e.target.value);
  }

  function submit(e) {
    e.preventDefault();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7045c02fede036465b404ba0e1f99c26`)
      .then(response => response.json())
      .then(data => {
        if (data.cod === '404') {
          setError('City not found. Please enter a valid city name.');
          setWeatherData(null);
        } else {
          setWeatherData(data);
          setError(null);
        }
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setError('Error fetching weather data. Please try again.');
        setWeatherData(null); 
      });
  }

  return (
    <div className="container">
    <section className='search-box'> <form onSubmit={submit}  >
        <input type='text' placeholder='Enter City Name' onChange={handle} />
        <button type='submit'>Submit</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      </section>
     

      
     <div>
     {weatherData && weatherData.main && (
      <div className="box-container">
        <h1 className="custom-header">{weatherData.name}</h1>
        <h2>Temperature: { (weatherData.main.temp - 273.15).toFixed(1) } °C</h2>
        <p>Weather: {weatherData.weather[0].description}</p>
        <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      </div>
     )}
     </div>
    </div>
  );
}

export default Weather;


