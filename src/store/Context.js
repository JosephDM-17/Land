import React, { createContext, useState, useRef, useEffect } from "react";
import getWeb3 from "../getWeb3";
import LandRegistration from "../contracts/LandRegistration.json";

export const Context = createContext(null);

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const LandRegistrationContractRef = useRef(null);
  const web3 = useRef(null);
  const [currentAccount, setCurrentAccount] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let user = window.localStorage.getItem("user");
    if (user) {
      setUser(user);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const web = await getWeb3();
        web3.current = web;
        setCurrentAccount(await web.eth.currentProvider.selectedAddress);
        const networkId = await web.eth.net.getId();
        const LandRegistrationContract = new web.eth.Contract(
          LandRegistration.abi,
          LandRegistration.networks[networkId] &&
            LandRegistration.networks[networkId].address
        );
        LandRegistrationContractRef.current = LandRegistrationContract;

        await LandRegistrationContractRef.current.methods
          .landCount()
          .call({ from: currentAccount }, (err, data) => setCount(data));
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        currentAccount,
        LandRegistrationContractRef,
        count,
      }}
    >
      {children}
    </Context.Provider>
  );
};
