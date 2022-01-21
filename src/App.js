import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import WeatherNow from "./components/WeatherNow";
import { useState, useEffect } from "react";

import loadingimage from "./assets/Shower.png";
import WeatherBox from "./components/WeatherBox";

function App() {
  //states and variables
  const [weather, setWeather] = useState([]);
  const [futureWeather, setFutureWeather] = useState([]);
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [source, setSource] = useState(``);
  const [weatherNow, setWeatherNow] = useState("");
  const [avgTemp, setAvgTemp] = useState(0);
  const [coords, setCoords] = useState({
    lon: 0,
    lat: 0,
  });

  let arr = [];

  //methods and promises
  const findCurrentLocationPromise = () => {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          setCoords({ lon: longitude, lat: latitude });
        },
        () => {
          alert("Could not get your location");
        }
      );
      if (navigator.geolocation) {
        resolve("success");
      }
    });
  };
  findCurrentLocationPromise();

  //useEffects
  useEffect(() => {
    const fetchCurrentLocation = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://www.metaweather.com/api/location/search/?lattlong=${coords.lat},${coords.lon}`
      );
      // console.log("fetchcurrentlocation");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();

      const woeid = responseData[0].woeid;
      const getWeather = await fetchWeather(woeid);
      if (getWeather !== "success") {
        throw new Error("Something went wrong");
      }
    };

    const fetchWeather = async (woeid) => {
      const response = await fetch(
        `https://www.metaweather.com/api/location/${woeid}/`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      // console.log(responseData);
      const cityData = responseData.title;

      const weatherData = responseData.consolidated_weather.map(
        (weatherData) => {
          return {
            weather: weatherData.weather_state_name,
            minTemp: weatherData.min_temp,
            maxTemp: weatherData.max_temp,
            averageTemp: weatherData.the_temp,
            date: weatherData.applicable_date,
            key: weatherData.id,
          };
        }
      );

      setWeather(weatherData);
      setCity(cityData);
      setIsLoading(false);
      arr = [...weatherData];
      arr.shift();
      setFutureWeather(arr);

      return "success";
    };

    fetchCurrentLocation();

    return () => {
      // setTime(false);
    };
  }, [coords]);

  useEffect(() => {
    let weatherUrl = `${weather[0]?.weather.split(" ").join("")}`;
    let url = `../assets/${weatherUrl}.png`;
    setSource(url);
    let avgTemp = Math.round(weather[0]?.averageTemp);
    setAvgTemp(avgTemp);
    let weatherNow = weather[0]?.weather;
    setWeatherNow(weatherNow);
  }, [weather]);

  return (
    <Container className="main-body">
      <Row>
        {!isLoading ? (
          <Col className="weather-now" md={4} sm={4}>
            <WeatherNow
              city={city}
              weather={weather}
              coords={coords}
              findCurrentLocationPromise={findCurrentLocationPromise}
              isLoading={isLoading}
              source={source}
              avgTemp={avgTemp}
              weatherNow={weatherNow}
            />
          </Col>
        ) : (
          <Col md={12} className="intro">
            <h1>Weather Forecast</h1>
            <img src={loadingimage} />
          </Col>
        )}
        <Col md={8} sm={8} className="second">
          <WeatherBox futureWeather={futureWeather} />
          <div className="title-highlights">Today's Highlights</div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
