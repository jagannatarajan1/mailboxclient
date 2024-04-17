import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import ViewEmails from "./viewEmails";

const Home = () => {
  //   const logoutHandler = () => {};
  return (
    <React.Fragment>
      <Navbar>
        <Container>
          <Navbar.Brand>Welcome to Expense Tracker!!!</Navbar.Brand>
          {/* <Navbar.Collapse className="justify-content-end">
            <div className="bgprofilecolor">
              <Navbar.Text>
                Your profile is Incomplete
                {/* <NavLink
                    to="/yourprofile"
                    style={({ isActive, isPending, isTransitioning }) => {
                      return {
                        padding: isPending ? "1px" : "2px",
                        fontWeight: isActive ? "bold" : "",
                        color: isPending ? "red" : "blue",
                        viewTransitionName: isTransitioning ? "slide" : "",
                        Hover: "red",
                      };
                    }}
                  >
                    Complete Now
                  </NavLink> */}
          {/* </Navbar.Text> */}
          {/* </div>
            <Button className="ms-3" onClick={logoutHandler}>
              Logout
            </Button>
          </Navbar.Collapse> */}
        </Container>
      </Navbar>
      <ViewEmails />
    </React.Fragment>
  );
};
export default Home;
