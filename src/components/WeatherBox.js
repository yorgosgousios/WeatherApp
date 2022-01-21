import styles from "./WeatherBox.module.css";
import WeatherList from "./WeatherList.js";

const WeatherBox = (props) => {
  return (
    <div className={styles.container}>
      {props.futureWeather?.map((weather) => (
        <WeatherList
          date={weather.date}
          weather={weather.weather}
          minTemp={weather.minTemp}
          maxTemp={weather.maxTemp}
          key={weather.key}
        />
      ))}
    </div>
  );
};

export default WeatherBox;
