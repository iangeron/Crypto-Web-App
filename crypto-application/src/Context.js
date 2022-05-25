import React, { createContext, useContext, useState, useEffect } from 'react'

const Crypto = createContext();

const Context = ({ children }) => {
  
    const [currency, setCurrency] = useState("CAD")
    const [symbol, setsymbol] = useState("C$")

    useEffect(() => {
      if (currency ==="CAD") setsymbol("C$");
      else if (currency ==="USD") setsymbol("$");  
    }, [currency]);
    

    return (

    <Crypto.Provider value={{currency,symbol,setCurrency}}>
        {children}
    </Crypto.Provider>
  )
};

export default Context

export const CryptoState = () => {
    return useContext(Crypto);
}