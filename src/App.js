import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/login";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import { useSelector } from "react-redux";
import Email from "./components/pages/Email";
import ViewMessage from "./components/pages/viewMessage";
import SendEmail from "./components/pages/sendedEmail";
import Forgotpassword from "./components/pages/Forgetpassword";
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
        <Route path="/composeEmail" element={<Email />} />
        <Route path="/openEmail" element={<ViewMessage />} />
        <Route path="/sendedEmail" element={<SendEmail />} />
        <Route path="/forgetPassword" element={<Forgotpassword />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
