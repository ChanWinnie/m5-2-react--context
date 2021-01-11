import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import items from "../Data";
import useInterval from "../hooks/use-interval.hook";
import usePersistedState from "../hooks/use-PersistedState.hook";

const calculateCookiesPerSecond = (purchasedItems) => {
  return Object.keys(purchasedItems).reduce((acc, itemId) => {
    const numOwned = purchasedItems[itemId];
    const item = items.find((item) => item.id === itemId);
    const value = item.value;
    return acc + value * numOwned;
  }, 0);
};

function App() {

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);

  const defaultCookies = 1000;
  const keyCookies = "num-cookies";
  const defaultItems = {
    cursor: 0,
    grandma: 0,
    farm: 0,
  };
  const keyItems = "items-purchased";
  
  const [ numCookies, setNumCookies]  = usePersistedState( defaultCookies, keyCookies);
  const [ purchasedItems, setPurchasedItems]  = usePersistedState( defaultItems, keyItems);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game 
            items={items}
            numCookies={numCookies} 
            setNumCookies={setNumCookies}
            purchasedItems={purchasedItems}
            setPurchasedItems={setPurchasedItems}     
            numOfGeneratedCookies={calculateCookiesPerSecond(purchasedItems)}
          />
        </Route>
      </Router>
    </>
  );
}

export default App;
