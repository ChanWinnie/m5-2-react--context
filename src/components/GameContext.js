import React from 'react';
import usePersistedState from "../hooks/use-PersistedState.hook";
import items from "../Data";

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
    const calculateCookiesPerSecond = (purchasedItems) => {
        return Object.keys(purchasedItems).reduce((acc, itemId) => {
          const numOwned = purchasedItems[itemId];
          const item = items.find((item) => item.id === itemId);
          const value = item.value;
          return acc + value * numOwned;
        }, 0);
      };

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

    return <GameContext.Provider value={{
        numCookies, 
        setNumCookies, 
        purchasedItems, 
        setPurchasedItems, 
        numOfGeneratedCookies: calculateCookiesPerSecond(purchasedItems)
    }}>{children}</GameContext.Provider>;
};