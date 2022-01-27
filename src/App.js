import "./App.css";
import { Container, Row, Col, ProgressBar, Spinner } from "react-bootstrap";
import WeatherNow from "./components/WeatherNow";
import { useState, useEffect } from "react";

import loadingimage from "./assets/Shower.png";
import WeatherBox from "./components/WeatherBox";
import TodaysHighlights from "./components/TodaysHighlights";

function App() {
  const [weather, setWeather] = useState([]);
  const [futureWeather, setFutureWeather] = useState([]);
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [source, setSource] = useState(``);
  const [coords, setCoords] = useState({
    lon: null,
    lat: null,
  });
  const [input, setInput] = useState("");
  const [initialLocationCalculated, setInitialLocationCalculated] = useState(
    false
  );

  let arr = [];

  //methods and promises
  const getCoordsFromPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        if (longitude !== null && latitude !== null) {
          setCoords({ lon: longitude, lat: latitude });
          setInitialLocationCalculated(true);
        }
      },
      () => {
        alert("Could not get your location");
      }
    );
  };

  const findCurrentLocationPromise = () => {
    if (navigator.geolocation) {
      return getCoordsFromPosition();
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

    const weatherData = responseData.consolidated_weather.map((weatherData) => {
      return {
        weather: weatherData.weather_state_name,
        minTemp: weatherData.min_temp,
        maxTemp: weatherData.max_temp,
        averageTemp: weatherData.the_temp,
        date: weatherData.applicable_date,
        key: weatherData.id,
        windSpeed: weatherData.wind_speed,
        humidity: weatherData.humidity,
        visibility: weatherData.visibility,
        airpressure: weatherData.air_pressure,
      };
    });

    setWeather(weatherData);
    setCity(cityData);
    setIsLoading(false);
    arr = [...weatherData];
    arr.shift();
    setFutureWeather(arr);

    return "success";
  };

  const fetchLocationFromInput = async (input) => {
    const response = await fetch(
      `https://www.metaweather.com/api/location/search/?query=${input}`
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const responseData = await response.json();
    const woeid = responseData[0]?.woeid;
    if (!woeid) {
      alert("City does not exist");
    } else {
      const getWeather = await fetchWeather(woeid);
      if (getWeather !== "success") {
        throw new Error("Something went wrong");
      }
    }
  };

  const fetchCurrentLocation = async () => {
    const response = await fetch(
      `https://www.metaweather.com/api/location/search/?lattlong=${coords.lat},${coords.lon}`
    );
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
  useEffect(() => {
    setIsLoading(true);
    findCurrentLocationPromise();
    console.log("useEffect no.1");
  }, []);

  useEffect(() => {
    if (!!coords && coords.lat !== null && coords.lon !== null)
      fetchCurrentLocation();

    console.log("useEffect no.2");
  }, [initialLocationCalculated]);

  useEffect(() => {
    console.log("useEffect no.3");
    let weatherUrl = `${weather[0]?.weather.split(" ").join("")}`;
    let url = `../assets/${weatherUrl}.png`;
    setSource(url);
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
              input={input}
              setInput={setInput}
              fetchWeather={fetchLocationFromInput}
              fetchCurrentLocation={fetchCurrentLocation}
            />
          </Col>
        ) : (
          <Col md={12} className="intro">
            <div className="loadingContainer">
              <Spinner animation="border" role="status" className="spinner" />
            </div>

            <h1>Weather Forecast</h1>
            <img src={loadingimage} />
          </Col>
        )}
        {!isLoading && (
          <Col md={8} sm={8} className="second">
            <WeatherBox futureWeather={futureWeather} />
            <div className="title-highlights">Today's Highlights</div>
            <Row className="highlights">
              <TodaysHighlights
                title="Wind Status"
                number={`${Math.round(weather[0]?.windSpeed)}mph`}
              />
              <TodaysHighlights
                title="Humidity"
                number={`${Math.round(weather[0]?.humidity)}%`}
                progressBar={
                  <ProgressBar
                    now={Math.round(weather[0]?.humidity)}
                    variant={"color"}
                  />
                }
              />
            </Row>
            <Row className="highlights_sm">
              <TodaysHighlights
                title="Visibility"
                number={`${weather[0]?.visibility.toFixed(1)} miles`}
              />
              <TodaysHighlights
                title="Air pressure"
                number={`${weather[0]?.airpressure} mb`}
              />
            </Row>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default App;
