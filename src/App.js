import { useState } from "react";

import Navbar from "react-bootstrap/Navbar";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Chart from './components/chart';

import dataset from "./dataset/best270techbooks";

function App() {
  const [filter, setFilter] = useState("");
  const [highlight, setHighlight] = useState("");

  const changedFilter = (e) => {
    setFilter(e.target.value);
  };

  const displayDataset = dataset.filter(
    (e) =>
      e.Book_title.toLowerCase().includes(filter.toLowerCase()) ||
      e.Description.toLowerCase().includes(filter.toLowerCase())
  );

  const hoverBar = e => setHighlight(e.Book_title);
  const goodreadsLink = s => `https://www.goodreads.com/search?q=${s}`;

  return (
    <Container>
      <Row className="justify-content-md-center" style={{ marginTop: 30 }}>
        <Chart data={displayDataset} onMouseEnter={hoverBar} />
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Filter by..."
                onChange={changedFilter}
              />
            </Form.Group>
          </Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Rating</th>
                <th>Title</th>
                <th>Pages</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {displayDataset.map((e) => (
                <tr
                  key={e.Book_title}
                  style={
                    highlight === e.Book_title
                      ? { backgroundColor: "light green" }
                      : {}
                  }
                >
                  <td>{e.Rating}</td>
                  <td>
                    <a href={goodreadsLink(e.Book_title)} target="_blank">
                      {e.Book_title}
                    </a>
                  </td>
                  <td>{e.Number_Of_Pages}</td>
                  <td>${e.Price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div>
            About the dataset:
            https://www.kaggle.com/thomaskonstantin/top-270-rated-computer-science-programing-books
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
