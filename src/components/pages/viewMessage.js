import React from "react";
// import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import "./viewEmails.css";
// import { LuPencil } from "react-icons/lu";
// import { MdInbox } from "react-icons/md";
// import { IoMdSend } from "react-icons/io";
import "./viewMessage.css";
// import { useNavigate } from "react-router-dom";
const ViewMessage = () => {
  //   const nav = useNavigate();
  const emailSelector = useSelector((state) => state.email.emailData);
  //   const selectorunReadedMessage = useSelector(
  //     (state) => state.email.totalUnreadedMessage
  //   );

  console.log(emailSelector);
  //   const composeHandler = () => {
  //     nav("/composeEmail");
  //   };

  return (
    <React.Fragment>
      <Container>
        <Row>
          {/* <Col xs={3} sm={3} md={2} lg={2} xl={2} xxl={2}>
            <ListGroup
              defaultActiveKey="#link1"
              className="border  border-2 border-dark-subtle paddingEmail"
            >
              <ListGroup.Item
                action
                onClick={composeHandler}
                className="bordercss "
              >
                <span className="p-2 ">
                  <LuPencil size={20} />
                </span>
                Compose
              </ListGroup.Item>
              <ListGroup.Item
                action
                // onClick={alertClicked}
                className="bordercss "
              >
                <span className="p-2">
                  <MdInbox size={20} />
                </span>
                Indox
                <span className="unReadedMessage bg-primary">
                  {selectorunReadedMessage}
                </span>
              </ListGroup.Item>
              <ListGroup.Item
                action
                // onClick={alertClicked}
                className="bordercss"
              >
                <span className="p-2">
                  <IoMdSend size={20} />
                </span>
                Sent
              </ListGroup.Item>
            </ListGroup>
          </Col> */}
          <Col>
            <div className="border border-2 ">
              <span>{emailSelector.email}</span>
              <p
                className="text-center mt-5 ms-3 me-3"
                dangerouslySetInnerHTML={{ __html: emailSelector.message }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};
export default ViewMessage;
