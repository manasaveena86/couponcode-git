import "./assets/css/style.css";
import "./assets/css/index.css";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CouponCodeList from "./components/CouponCode/CouponCodeList";
// import MainApp from "./components/Navigation/MainApp";
import Dashboard from "./components/Dashboard";
import CouponCodeCreate from "./components/CouponCode/CouponCodeCreate"
import CouponCodeValidate from "./components/CouponCode/CouponCodeValidate.js";
function App() {
  return (
    
      <Router>
        <Routes>
          <Route path="/" element = {<CouponCodeList/>} exact />
          <Route path="/create" element = {<CouponCodeCreate/>} exact />
          <Route path="/validate" element = {<CouponCodeValidate/>} exact />
          {/* <Route path="/user" element={<MainApp/>} exact></Route>  */}
          {/* <Route path="/" component={MainApp} /> */}
        </Routes>
      </Router>
   
  );
}

export default App;
