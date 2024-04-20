import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { loginSliceAction } from "./loginSlice";

import "./login.css";
import { useDispatch } from "react-redux";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfrimpassword] = useState("");
  const [login, setlogin] = useState(false);
  let url;
  const nav = useNavigate();
  const dispatch = useDispatch();

  const emailChangeHandler = (event) => {
    setemail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setpassword(event.target.value);
  };
  const confirmpasswordChangeHandler = (event) => {
    setconfrimpassword(event.target.value);
  };
  const already = () => {
    setlogin((preState) => !preState);
  };
  const forgothandler = () => {
    nav("/forgetPassword");
  };
  const formDataPresent = login
    ? email && password
    : email && password && confirmpassword;
  const formhandler = async (event) => {
    event.preventDefault();

    if (login) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAS3lIYdA972RLHh9zfb_CVp42aWxpVX3w";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAS3lIYdA972RLHh9zfb_CVp42aWxpVX3w";
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      console.log(data);
      console.log("user successfully login");
      if (response.ok) {
        dispatch(loginSliceAction.logIn(data));
        nav("/");
      } else {
        alert(data.error.message);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <React.Fragment>
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <Form className="border ps-5 pt-5 pb-5">
          <Form.Group
            as={Row}
            className="mb-3 w"
            controlId="formPlaintextEmail"
          >
            <Form.Label>Email</Form.Label>
            <Col sm="10">
              <Form.Control
                placeholder="email@example.com"
                onChange={emailChangeHandler}
                value={email}
              />
            </Col>
            <div className="pc">
              {/* {!error ? (
                <p className="invalid">Your email is Invalid</p>
              ) : (
                <p className="valid">Your email is valid</p>
              )} */}
            </div>
          </Form.Group>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label>Password</Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={passwordChangeHandler}
                value={password}
              />
            </Col>
          </Form.Group>
          {!login && (
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="confirmformPlaintextPassword"
            >
              <Form.Label>Confirm Password</Form.Label>
              <Col sm="10">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  onChange={confirmpasswordChangeHandler}
                  value={confirmpassword}
                />
              </Col>
            </Form.Group>
          )}
          <div className="forgotPasssword">
            <p onClick={forgothandler}>Forgot password?</p>
          </div>

          <div className="d-grid gap-4 col-9 mx-3">
            <Button
              onClick={formhandler}
              variant="primary"
              disabled={!formDataPresent}
            >
              {login ? "SignIn" : "Signup"}
            </Button>
          </div>
        </Form>
      </div>
      <p
        className="already container d-flex justify-content-center "
        onClick={already}
      >
        {login ? "Dont't have an account?SignUp" : "Already have a Account"}
      </p>
    </React.Fragment>
  );
};
export default Login;
