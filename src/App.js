import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import WeatherNow from "./components/WeatherNow";
import { useEffect, useState } from "react";
import loadingimage from "./assets/Shower.png";

function App() {
  const [coords, setCoords] = useState({
    lon: 0,
    lat: 0,
  });
  const [count, setCount] = useState(0);

  // let coords = { lon: 0, lat: 0 };

  const [weather, setWeather] = useState([]);
  const [time, setTime] = useState(false);
  const [city, setCity] = useState("");
  let arr = [];

  useEffect(() => {
    const findCurrentLocationPromise = () => {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // console.log("mpike mesa");
            const longitude = position.coords.longitude;
            const latitude = position.coords.latitude;
            // console.log(latitude, longitude);
            setCoords({ lon: longitude, lat: latitude });
            console.log(longitude, latitude);

            // console.log(lat, lon);
            // console.log(coords);
          },
          () => {
            alert("Could not get your location");
          }
        );
        if (navigator.geolocation) {
          resolve("success");
          // console.log(lat, lon);
        }
      });
    };
    findCurrentLocationPromise();
  }, []);

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      console.log(coords);
      const response = await fetch(
        `https://www.metaweather.com/api/location/search/?lattlong=${coords.lat},${coords.lon}`
      );
      console.log("fetchcurrentlocation");
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
      // console.log(cityData);
      arr = [...weatherData];
      arr.shift();
      // console.log(arr);

      return "success";
    };

    fetchCurrentLocation();
    setCount(count + 1);

    return () => {
      // setTime(false);
    };
  }, [coords]);

  setTimeout(() => setTime(true), 2000);
  console.log(count);

  return (
    <Container className="main-body">
      <Row>
        {time ? (
          <Col className="weather-now" md={4} sm={4}>
            <WeatherNow
              weatherData={weather}
              cityName={city}
              latitude={coords.lat}
              longitude={coords.lon}
            />
          </Col>
        ) : (
          <Col md={12} className="intro">
            <h1>Weather Forecast</h1>
            <img src={loadingimage} />
          </Col>
        )}
        <Col md={8} sm={8}></Col>
      </Row>
    </Container>
  );
}

export default App;
