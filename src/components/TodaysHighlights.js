import React from "react";
import styles from "./TodaysHighlights.module.css";

const TodaysHighlights = (props) => {
  // console.log("highlights running");
  return (
    <div className={styles.container}>
      <p>{props.title}</p>
      <h1>{props.number}</h1>
      {props.progressBar}
    </div>
  );
};

export default TodaysHighlights;
