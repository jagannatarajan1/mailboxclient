import React, { useEffect, useState } from "react";
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

const ViewEmails = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const emailgetSelector = useSelector((state) => state.login.email);

  const [receiverData, setReceiverData] = useState([]);
  const selectorunReadedMessage = useSelector(
    (state) => state.email.totalUnreadedMessage
  );
  const emailSelector = useSelector((state) => state.login.email);
  console.log(receiverData);
  const composeHandler = () => {
    nav("/composeEmail");
  };
  const viewFullMessageHandler = async (data) => {
    dispatch(emailSliceAction.viewFullMessage(data));
    nav("/openEmail");
    try {
      const response = await fetch(
        `https://mailboxclient-5ed6c-default-rtdb.firebaseio.com/Persons/${emailgetSelector}/${data.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            senderEmail: data.enderEmail,
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

  const alertClicked = () => {
    alert("You clicked the ListGroupItem");
  };
  useEffect(() => {
    const fetchDataFunction = async () => {
      try {
        const response = await fetch(
          `https://mailboxclient-5ed6c-default-rtdb.firebaseio.com/Persons/${emailSelector}.json`
        );
        const data = await response.json();
        console.log(data);
        const fetchedData = [];
        let totalUnreadedEmail = 0;
        for (const key in data) {
          fetchedData.push({
            id: key,
            ...data[key],
          });
          if (!data[key].readedMessage) {
            totalUnreadedEmail += 1;
          }
        }
        console.log(totalUnreadedEmail);
        dispatch(emailSliceAction.unreadedMessage(totalUnreadedEmail));
        setReceiverData(fetchedData);
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchDataFunction();
  }, [emailSelector, dispatch]);

  return (
    <Container>
      <Row>
        <Col xs={3} sm={3} md={2} lg={2} xl={2} xxl={2}>
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
              onClick={alertClicked}
              className="bordercss "
            >
              <span className="p-2">
                <MdInbox size={20} />
              </span>
              Indox{" "}
              <span className="unReadedMessage bg-primary">
                {selectorunReadedMessage}
              </span>
            </ListGroup.Item>
            <ListGroup.Item action onClick={alertClicked} className="bordercss">
              <span className="p-2">
                <IoMdSend size={20} />
              </span>
              Sent
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <ListGroup defaultActiveKey="#link1" className=" optionlist">
            {receiverData.map((receiveData) => (
              <ListGroup.Item
                action
                key={receiveData.id}
                className={`singleEmail-${receiveData.readedMessage}`}
                onClick={() => viewFullMessageHandler(receiveData)}
              >
                {!receiveData.readedMessage && (
                  <span className="blueCircle bg-primary me-2"></span>
                )}
                <span className="pe-5">{receiveData.senderEmail}</span>
                {receiveData.subject}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewEmails;
