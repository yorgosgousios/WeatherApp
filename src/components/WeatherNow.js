import { Button, Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import styles from "./WeatherNow.module.css";
import { BiCurrentLocation } from "react-icons/bi";
import { IoLocationSharp } from "react-icons/io5";
import SearchCity from "./SearchCity";

const WeatherNow = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  // console.log("weathernow running");
  const locationHandler = () => {
    props.findCurrentLocationPromise();
    props.fetchCurrentLocation();
  };

  const buttonHandler = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Container className={styles.container}>
      {!isClicked ? (
        <Row>
          <Col md={12}>
            <div className={styles.nav}>
              <Button
                className={styles.btn}
                variant="secondary"
                onClick={buttonHandler}
              >
                Search for places
              </Button>

              <BiCurrentLocation
                className={styles.icon}
                onClick={locationHandler}
              />
            </div>
            <img src={props.source} alt="image" className={styles.image} />
            <div className={styles.temp}>
              {Math.round(props.weather[0]?.averageTemp)}
              <span className={styles.celcius}>℃</span>
            </div>
            <p className={styles.weather}>{props.weather[0]?.weather}</p>
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
      ) : (
        <SearchCity
          input={props.input}
          setInput={props.setInput}
          xHandler={buttonHandler}
          fetchWeather={props.fetchWeather}
        />
      )}
    </Container>
  );
};

export default WeatherNow;
