import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import useInterval from "../hooks/use-interval.hook";
import { GameContext } from "./GameContext";

function App() {

  const { numCookies, setNumCookies, numOfGeneratedCookies } = useContext(GameContext);

  useInterval(() => {
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  useEffect(() => {
    gameOnLoad();
    window.onunload = () => {
      localStorage.setItem("unloadTime", new Date().getTime());
    };
  }, []);

  const gameOnLoad = () => {
    const unloadTime = localStorage.getItem("unloadTime");
    //console.log(unloadTime)
    const timeDifference = new Date().getTime() - unloadTime;
    //console.log(timeDifference)
    const timePassed = Math.floor(timeDifference / 1000);
    //console.log(timePassed)
    if(numOfGeneratedCookies > 0) {
      //console.log("numofgeneratedcookies > 0")
      setNumCookies(numCookies + (numOfGeneratedCookies * timePassed));
    }
  }

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Router>
    </>
  );
}

export default App;
