import React from "react";

import "./StartingPage.css";
import {useNavigate,Link} from 'react-router-dom'
function StartingPage() {
  // const history=useNavigate()
  return (
    <div className="bg_container">
      <div className="inner_class1">
        <h1>Welcome to Land Registration Platform</h1>

      </div>
    </div>
  );
}

export default StartingPage;