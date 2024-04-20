// import React, { useEffect, useState } from "react";
import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import "./viewEmails.css";
import { LuPencil } from "react-icons/lu";
import { MdInbox } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoMdSend } from "react-icons/io";
import { emailSliceAction } from "./emailSlice";
import { Button } from "react-bootstrap";
import { useApi } from "../customHooks/CustomHooks";

const ViewEmails = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const emailgetSelector = useSelector((state) => state.login.email);
  // const refreshSelector = useSelector((state) => state.email.refresh);

  // const [receiverData, setReceiverData] = useState([]);
  // const [timeoutRefresh, settimeoutRefresh] = useState(false);

  const selectorunReadedMessage = useSelector(
    (state) => state.email.totalUnreadedMessage
  );
  const emailSelector = useSelector((state) => state.login.email);
  const composeHandler = () => {
    nav("/composeEmail");
  };
  const sendedMailHandler = () => {
    nav("/sendedEmail");
  };
  const delectHandler = async (id) => {
    try {
      const response = await fetch(
        `https://mailboxclient-5ed6c-default-rtdb.firebaseio.com/Persons/${emailgetSelector}/ReceivedMail/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      dispatch(emailSliceAction.refreshScreen());
    } catch (error) {
      throw new Error(error);
    }
  };
  const viewFullMessageHandler = async (data) => {
    dispatch(emailSliceAction.viewFullMessage(data));
    nav("/openEmail");
    try {
      const response = await fetch(
        `https://mailboxclient-5ed6c-default-rtdb.firebaseio.com/Persons/${emailgetSelector}/ReceivedMail/${data.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            senderEmail: data.senderEmail,
            email: data.email,
            subject: data.subject,
            message: data.message,
            readedMessage: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const output = await response.json();
      console.log("put request" + output);
    } catch (error) {
      throw new Error(error);
    }
  };

  const { receiverData } = useApi(
    `https://mailboxclient-5ed6c-default-rtdb.firebaseio.com/Persons/${emailSelector}/ReceivedMail.json`,
    true
  );

  console.log(receiverData);
  // useEffect(() => {
  //   const fetchDataFunction = async () => {
  //     try {
  //       const response = await fetch(s
  //         `https://mailboxclient-5ed6c-default-rtdb.firebaseio.com/Persons/${emailSelector}/ReceivedMail.json`
  //       );
  //       const data = await response.json();
  //       const fetchedData = [];
  //       let totalUnreadedEmail = 0;
  //       console.log("useeffffecttt");
  //       for (const key in data) {
  //         fetchedData.push({
  //           id: key,
  //           ...data[key],
  //         });
  //         if (!data[key].readedMessage) {
  //           totalUnreadedEmail += 1;
  //         }
  //       }
  //       dispatch(emailSliceAction.unreadedMessage(totalUnreadedEmail));
  //       setReceiverData(fetchedData);
  //     } catch (error) {
  //       console.error("Error fetching emails:", error);
  //     }
  //   };
  //   fetchDataFunction();
  //   const intervalId = setInterval(() => {
  //     settimeoutRefresh((pre) => !pre);
  //   }, 2000);
  //   return () => clearInterval(intervalId);
  // }, [emailSelector, dispatch, refreshSelector, timeoutRefresh]);

  return (
    <React.Fragment>
      <Container className="mt-5">
        <Row>
          <Col xs={3} sm={3} md={2} lg={2} xl={2} xxl={2}>
            <ListGroup
              defaultActiveKey="#link1"
              className="border  border-2 border-dark-subtle paddingEmail "
            >
              <ListGroup.Item
                action
                onClick={composeHandler}
                className="bordercss composeCss"
              >
                <span className="p-2 ">
                  <LuPencil size={20} />
                </span>
                <span>Compose</span>
              </ListGroup.Item>
              <ListGroup.Item action className="bordercss ">
                <span className="p-2">
                  <MdInbox size={20} />
                </span>
                <span>Inbox</span>
                <span className="unReadedMessage bg-primary">
                  {selectorunReadedMessage}
                </span>
              </ListGroup.Item>
              <ListGroup.Item
                action
                onClick={sendedMailHandler}
                className="bordercss sentCss"
              >
                <span className="p-2">
                  <IoMdSend size={20} />
                </span>
                <span>Sent</span>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <ListGroup defaultActiveKey="#link1" className="optionlist">
              {receiverData.map((receiveData) => (
                <div key={receiveData.id} className="d-flex ">
                  <ListGroup.Item
                    action
                    className={`singleEmail-${receiveData.readedMessage}`}
                    onClick={() => viewFullMessageHandler(receiveData)}
                  >
                    <Row>
                      <Col
                        xs={5}
                        sm={5}
                        md={5}
                        lg={5}
                        xl={4}
                        xxl={4}
                        className="me-3"
                      >
                        {!receiveData.readedMessage && (
                          <span className="blueCircle bg-primary me-2"></span>
                        )}
                        <span className="">{receiveData.senderEmail}</span>
                      </Col>
                      <Col>
                        <span> {receiveData.subject}</span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <Button
                    variant="danger"
                    onClick={() => delectHandler(receiveData.id)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ViewEmails;
