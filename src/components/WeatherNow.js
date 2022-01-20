import { Button, Container, Row, Col } from "react-bootstrap";
import styles from "./WeatherNow.module.css";
import { BiCurrentLocation } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import { useContext } from "react";
import GlobalState from "../state/global-state";

const WeatherNow = (props) => {
  const ctx = useContext(GlobalState);
  const locationHandler = () => {
    ctx.clickToGetLocationHandler();
    console.log(ctx.city);
  };

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
          <img src={ctx.source} alt="image" className={styles.image} />
          <div className={styles.temp}>
            {ctx.avgTemp}
            <span className={styles.celcius}>℃</span>
          </div>
          <p className={styles.weather}>{ctx.weatherNow}</p>
          <div className={styles.city}>
            <IoLocationSharp />
            <p>{ctx.city}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default WeatherNow;
