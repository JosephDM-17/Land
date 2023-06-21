import React from "react";
import { Routes, Route } from "react-router-dom";
import Start from "./Pages/Start";
import SignUp from "./Pages/Signup";
import AddLand from "./Pages/AddLand";
import SellLand from "./Pages/SellLand";
import LandingPage from "./Pages/LandingPage";
import ViewPost from "./Pages/ViewPost";
import LIDashboard from "./Pages/LIDashboard";
import Navigation from "./Components/Navbar/Navbar";
import { AppProvider } from "./store/Context";

function App() {
  return (
    <AppProvider>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addland" element={<AddLand />} />
          <Route path="/sellland" element={<SellLand />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/viewpost" element={<ViewPost />} />
          <Route path="/lidashboard" element={<LIDashboard />} />
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
