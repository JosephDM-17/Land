import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import logo from "../../assets/icons8-male-user-50.png";
import "./Navbar.css";

const Navigation = (props) => {
  const [account, setAccount] = useState(props.user);
  const [isloggedIn, setIsloggedIn] = useState(false);
  const connectHandler = async () => {
    // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // const account = accounts[0]
    // setAccount(account);
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setIsloggedIn(true);
        window.localStorage.setItem("user", accounts[0]);
        // console.log(walletAddress);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      console.log("Please install MetaMask");
    }
  };

  return (
    <nav>
      <ul className="nav__links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/landing">Buy</Link>
        </li>
        <li>
          <Link to="/addland">Register Land</Link>
        </li>
        <li>
          <Link to="/sellland">My Land</Link>
        </li>
      </ul>

      <div className="nav__brand">
        <img src={logo} alt="Logo" />
        <h1>Landfi</h1>
      </div>

      <ul className="last_buttons">
        <li>
          {" "}
          <Link to="/lidashboard">Land Inspector</Link>
        </li>
        {!isloggedIn ? (
          <li>
            {" "}
            <a href="https://metamask.io/" target="_blank">SignUp</a>
          </li>
        ) : (
          ""
        )}

        {account ? (
          <li>
            <button type="button" className="nav__connect">
              {account.slice(0, 4) + "..." + account.slice(40, 42)}
            </button>
          </li>
        ) : (
          <li>
            <button
              type="button"
              className="nav__connect"
              onClick={connectHandler}
            >
              Login
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
