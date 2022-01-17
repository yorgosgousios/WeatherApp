import React from "react";

const GlobalState = React.createContext({
  coords: { lat: 0, lon: 0 },
  city: "",
  weather: [],
});

export default GlobalState;
