import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Button, Container } from "react-bootstrap";
import ViewEmails from "./viewEmails";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    nav("/loginpage");
  };
  return (
    <React.Fragment>
      <Navbar>
        <Container>
          <Navbar.Brand>Welcome to MailChat</Navbar.Brand>

          <Button className="ms-3" onClick={logoutHandler}>
            Logout
          </Button>
        </Container>
      </Navbar>
      <ViewEmails />
    </React.Fragment>
  );
};
export default Home;
