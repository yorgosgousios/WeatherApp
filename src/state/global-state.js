import { useState, useEffect } from "react";
import React from "react";

const GlobalState = React.createContext({
  coords: { lat: 0, lon: 0 },
  city: "",
  weather: [],
  clickToGetLocationHandler: () => {},
  time: false,
  isLoading: true,
  source: "",
  avgTemp: 0,
  weatherNow: "",
});

export const GlobalStateProvider = (props) => {
  const [coords, setCoords] = useState({
    lon: 0,
    lat: 0,
  });
  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [source, setSource] = useState(``);
  const [weatherNow, setWeatherNow] = useState("");
  const [avgTemp, setAvgTemp] = useState(0);
  let arr = [];

  const findCurrentLocationPromise = () => {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log("mpike mesa");
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          // console.log(latitude, longitude);
          setCoords({ lon: longitude, lat: latitude });
          console.log(coords);
          // console.log(longitude, latitude);

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
  // }, []);
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
      console.log(cityData);
      arr = [...weatherData];
      arr.shift();

      return "success";
    };

    fetchCurrentLocation();

    return () => {
      // setTime(false);
    };
  }, [coords]);

  useEffect(() => {
    let weatherUrl = `${weather[0]?.weather.split(" ").join("")}`;
    console.log(weatherUrl);
    let url = `../assets/${weatherUrl}.png`;
    setSource(url);
    console.log(source);
    let avgTemp = Math.round(weather[0]?.averageTemp);
    setAvgTemp(avgTemp);
    let weatherNow = weather[0]?.weather;
    setWeatherNow(weatherNow);
  }, [weather]);

  // setTimeout(() => setTime(true), 2000);

  return (
    <GlobalState.Provider
      value={{
        city: city,
        weather: weather,
        coords: coords,
        clickToGetLocationHandler: findCurrentLocationPromise,
        isLoading: isLoading,
        source: source,
        avgTemp: avgTemp,
        weatherNow: weatherNow,
      }}
    >
      {props.children}
    </GlobalState.Provider>
  );
};

export default GlobalState;
