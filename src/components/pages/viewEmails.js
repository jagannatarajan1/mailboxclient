import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import "./viewEmails.css";
import { LuPencil } from "react-icons/lu";
import { MdInbox } from "react-icons/md";

const ViewEmails = () => {
  const [receiverData, setReceiverData] = useState([]);
  const emailSelector = useSelector((state) => state.login.email);
  console.log(receiverData);

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
  }, [emailSelector]);

  return (
    <Container>
      <Row>
        <Col xs={3} sm={3} md={2} lg={2} xl={2} xxl={2}>
          <ListGroup
            defaultActiveKey="#link1"
            className="border  border-2 border-dark-subtle text-center"
          >
            <ListGroup.Item action onClick={alertClicked} className="bordercss">
              <span className="p-2">
                <LuPencil size={20} />
              </span>
              Compose
            </ListGroup.Item>
            <ListGroup.Item action onClick={alertClicked} className="bordercss">
              <span className="p-2">
                <MdInbox size={20} />
              </span>
              Indox
            </ListGroup.Item>
            <ListGroup.Item action onClick={alertClicked} className="bordercss">
              Sent
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <ListGroup defaultActiveKey="#link1" className=" optionlist">
            {receiverData.map((receiveData) => (
              <ListGroup.Item action key={receiveData.id}>
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
