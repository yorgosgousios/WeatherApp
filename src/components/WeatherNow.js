import { Button, Container, Row, Col } from "react-bootstrap";
import styles from "./WeatherNow.module.css";
import { BiCurrentLocation } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";

const WeatherNow = (props) => {
  // console.log(longitude);
  const locationHandler = () => {};

  return (
    <Container className={styles.container}>
      <Row>
        <Col md={12}>
          <div className={styles.nav}>
            <Button className={styles.btn} variant="secondary">
              Search for places
            </Button>
            <BiCurrentLocation
              className={styles.icon}
              onClick={locationHandler}
            />
          </div>
          <img
            src={require(`../assets/${props.weatherData[0].weather
              .split(" ")
              .join("")}.png`)}
            alt="image"
            className={styles.image}
          />
          <div className={styles.temp}>
            {Math.round(props.weatherData[0].averageTemp)}
            <span className={styles.celcius}>℃</span>
          </div>
          <p className={styles.weather}>{props.weatherData[0].weather}</p>
          <div className={styles.city}>
            <IoLocationSharp />
            <p>{props.cityName}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default WeatherNow;
