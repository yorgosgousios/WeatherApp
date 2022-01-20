import "./App.css";
import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import WeatherNow from "./components/WeatherNow";

import loadingimage from "./assets/Shower.png";
import GlobalState from "./state/global-state";

function App() {
  // useEffect(() => {
  const ctx = useContext(GlobalState);

  return (
    <Container className="main-body">
      <Row>
        {!ctx.isLoading ? (
          <Col className="weather-now" md={4} sm={4}>
            <WeatherNow />
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
