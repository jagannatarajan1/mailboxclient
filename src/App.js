import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/login";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import { useSelector } from "react-redux";
// import ViewEmails from "./components/pages/viewEmails";
function App() {
  const loginSelector = useSelector((state) => state.login.loginStatus);
  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/"
          element={loginSelector ? <Home /> : <Navigate to="/loginpage" />}
        ></Route>
        <Route path="/loginpage" element={<Login />} />
        {/* <Route/> */}
      </Routes>
    </React.Fragment>
  );
}

export default App;
