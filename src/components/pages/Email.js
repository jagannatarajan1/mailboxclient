import React, { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Email.css";
import { useSelector } from "react-redux";

const Email = () => {
  const [value, setValue] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [error, setError] = useState("");
  const emailselector = useSelector((state) => state.login.email);
  const fullEmail = emailselector + "@gmail.com";

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const subjectHandler = (event) => {
    setSubject(event.target.value);
  };

  const formHandler = async (event) => {
    event.preventDefault();

    if (!email.trim() || !subject.trim() || !value.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");

    const emailData = {
      senderEmail: fullEmail,
      email: email,
      subject: subject,
      message: value,
      readedMessage: false,
    };
    const receiver = email.replace("@gmail.com", "");

    try {
      const response = await fetch(
        `https://mailboxclient-5ed6c-default-rtdb.firebaseio.com/Persons/${receiver}/ReceivedMail.json`,
        {
          method: "POST",
          body: JSON.stringify(emailData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send email.");
      }

      console.log("Email sent successfully!");
      setEmail("");
      setSubject("");
      setValue("");
      const sendedMail = await fetch(
        `https://mailboxclient-5ed6c-default-rtdb.firebaseio.com/Persons/${emailselector}/Sended.json`,
        {
          method: "POST",
          body: JSON.stringify(emailData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const dataOfSendedMail = sendedMail.json();
      console.log(dataOfSendedMail);
    } catch (error) {
      console.error("Error:", error.message);
      setError("Failed to send email. Please try again later.");
    }
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <React.Fragment>
      <Container>
        <Form>
          <InputGroup className="mb-3 no-border">
            <InputGroup.Text id="basic-addon1" className="no-border">
              To
            </InputGroup.Text>
            <Form.Control
              className="no-border"
              placeholder="Email"
              autoComplete="email"
              name="email"
              value={email}
              onChange={emailHandler}
            />
          </InputGroup>
          <hr />
          <Form.Control
            type="text"
            placeholder="Subject"
            name="subject"
            className="no-border"
            value={subject}
            onChange={subjectHandler}
          />
          <hr className="foms" />
          <ReactQuill
            modules={modules}
            theme="snow"
            value={value}
            onChange={setValue}
            className="quill"
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              height: "400px",
            }}
          />
          {error && <p className="error">{error}</p>}
          <Button className="ps-4 pe-4" onClick={formHandler}>
            Send
          </Button>
        </Form>
      </Container>
    </React.Fragment>
  );
};

export default Email;
