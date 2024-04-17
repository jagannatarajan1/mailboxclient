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

const SendEmail = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [receiverData, setReceiverData] = useState([]);

  const emailgetSelector = useSelector((state) => state.login.email);
  const selectorunReadedMessage = useSelector(
    (state) => state.email.totalUnreadedMessage
  );
  const composeHandler = () => {
    nav("/composeEmail");
  };
  const viewFullMessageHandler = async (data) => {
    dispatch(emailSliceAction.viewFullMessage(data));
    nav("/openEmail");
  };
  const sendedMailHandler = () => {
    nav("/sendedEmail");
  };
  const indoxHandler = () => {
    nav("/");
  };
  useEffect(() => {
    const fetchDataFunction = async () => {
      try {
        const response = await fetch(
          `https://mailboxclient-5ed6c-default-rtdb.firebaseio.com/Persons/${emailgetSelector}/Sended.json`
        );
        const data = await response.json();
        console.log(data);
        const fetchedData = [];
        for (const key in data) {
          fetchedData.push({
            id: key,
            ...data[key],
          });
        }
        setReceiverData(fetchedData);
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchDataFunction();
  }, [emailgetSelector]);

  return (
    <React.Fragment>
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
                <span>Compose</span>
              </ListGroup.Item>
              <ListGroup.Item
                action
                className="bordercss "
                onClick={indoxHandler}
              >
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
                className="bordercss"
                onClick={sendedMailHandler}
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
                        <span>{receiveData.senderEmail}</span>
                      </Col>
                      <Col>
                        <span> {receiveData.subject}</span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </div>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};
export default SendEmail;
