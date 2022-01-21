import styles from "./WeatherList.module.css";
import "../App.css";

const WeatherList = (props) => {
  return (
    <div className={styles.container}>
      <li className="list-item">
        <p>{props.date}</p>
        <div>{props.weather}</div>
        <p>
          {Math.round(props.minTemp)}
          <span>℃</span>
        </p>
        <p>
          {Math.round(props.maxTemp)}
          <span>℃</span>
        </p>
      </li>
    </div>
  );
};

export default WeatherList;
