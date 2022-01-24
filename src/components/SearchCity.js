import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./SearchCity.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { Input, InputAdornment } from "@mui/material";

const SearchCity = (props) => {
  const inputHandler = (e) => {
    props.setInput(e.target.value);
    // console.log(input);
  };

  const clickHandler = () => {
    props.fetchWeather(props.input);
    props.xHandler();
  };
  return (
    <Container className={styles.container}>
      <Row>
        <Col md={12}>
          <div className={styles.x}>
            <button onClick={props.xHandler}>x</button>
          </div>
          <div className={styles.inputContainer}>
            <Input
              startAdornment={
                <InputAdornment position="start">
                  <AiOutlineSearch className={styles.icon} />
                </InputAdornment>
              }
              placeholder=" search location"
              className={styles.input}
              onChange={inputHandler}
            />
            <Button className={styles.btn} onClick={clickHandler}>
              Search
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchCity;
