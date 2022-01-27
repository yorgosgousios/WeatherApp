import styles from "./WeatherList.module.css";
import "../App.css";

const WeatherList = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <li className="list-item">
          <p>{props.date}</p>
          <div className={styles.weather}>{props.weather}</div>
          <div className="temps">
            <p>
              {Math.round(props.maxTemp)}
              <span>℃</span>
            </p>
            <p>
              {Math.round(props.minTemp)}
              <span>℃</span>
            </p>
          </div>
        </li>
      </div>
    </div>
  );
};

export default WeatherList;
