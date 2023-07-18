import "./App.css";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function App() {
  const [query, setQuery] = useState("");
  const [summary, setSummary] = useState("");
  const [fileData, setFileData] = useState<any>("");
  const [result, setResult] = useState<any>("");

  const handleSubmit = async (e: any) => {
    const reqObj = {
      document: fileData.replace("data:application/pdf;base64,", ""),
      summary,
      query,
    };
    try {
      const res = await fetch("http://localhost:3001/document/analyzePdf", {
        method: "POST",
        body: JSON.stringify(reqObj),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      setResult(response.result);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      // Use the base64String as needed
      console.log("Base64 String:", base64String);
      setFileData(base64String);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Container>
      <>
        <Form.Group className="mb-3" controlId="exampleForm.controlFile">
          <Form.Label>Select pdf document</Form.Label>
          <Form.Control
            type="file"
            accept=".pdf"
            placeholder="select file"
            onChange={handleFileChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.controlSummary">
          <Form.Label>Enter Summary</Form.Label>
          <Form.Control
            type="text"
            value={summary}
            onChange={(e) => {
              setSummary(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.controlQuery">
          <Form.Label>Enter Query</Form.Label>
          <Form.Control
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </>
      {result && (
        <>
          {result.split("\n").map((str: string, i: number) => (
            <p key={i}>{str}</p>
          ))}
        </>
      )}
    </Container>
  );
}

export default App;
