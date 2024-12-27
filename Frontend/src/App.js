import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./Components/Home/Home";
// import ScoreDownload from './Components/Scoredownload/ScoreDownload';

import SignupPage from "./Components/Signup/SignupPage";
import SigninPage from "./Components/Signin/SigninPage";
import Section1 from "./Components/Section1/Section1";
import Section2 from "./Components/Section2/Section2";
import Section3 from "./Components/Section3/Section3";
import Section4 from "./Components/Section4/Section4";
// import Bargraph from "./Components/Bargraph/Bargraph";
// import Assessment from "./Components/Assessment/Assessment";

const App = () => {
  return (
    <Router>
      <div className="App">
         <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/Signin" element={<SigninPage />} />
         {/* <Route path="/" element={<Home/>} /> */}
          <Route path="/Section1" element={<Section1 />} /> 
          <Route path="/Section2" element={<Section2 />} />
          <Route path="/section3" element={<Section3 />} />
          <Route path="/section4" element={<Section4 />} />
          {/* <Route path="/bargraph" element={<Bargraph />} />  */}
          {/* <Route path="/scoredownload" element={<ScoreDownload/>} /> */}
          {/* <Route path="*" element={<SignupPage />} />  */}
          {/* <Route path="/"  element={<Assessment />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
