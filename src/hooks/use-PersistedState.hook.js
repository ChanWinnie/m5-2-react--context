import { useState, useEffect } from 'react';

const usePersistedState = ( defaultValue, key ) => {

    const [ value, setValue ] = useState(() => {
        const data = localStorage.getItem(key);
        return data !== null ? JSON.parse(data) : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
        //localStorage.removeItem(key);
    });

  return [ value, setValue ];
};

export default usePersistedState; 