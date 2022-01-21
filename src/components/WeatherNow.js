import { Button, Container, Row, Col } from "react-bootstrap";
import styles from "./WeatherNow.module.css";
import { BiCurrentLocation } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import image from "../assets/Hail.png";
import { useState } from "react";

const WeatherNow = (props) => {
  const locationHandler = () => {
    props.findCurrentLocationPromise();
    console.log(props.city);
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
          <img src={props.source} alt="image" className={styles.image} />
          <div className={styles.temp}>
            {props.avgTemp}
            <span className={styles.celcius}>℃</span>
          </div>
          <p className={styles.weather}>{props.weatherNow}</p>
          <p className={styles.date}>
            Today •
            {props.weather[0]?.date.toLocaleString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
          </p>
          <div className={styles.city}>
            <IoLocationSharp />
            <p>{props.city}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default WeatherNow;
