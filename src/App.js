import { useState } from "react";

import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Chart from "./components/chart";

import { birthday as palette } from "./palettes";
import dataset from "./dataset/best270techbooks";

function App() {
  const [filter, setFilter] = useState("");
  const [highlight, setHighlight] = useState("");
  const [categories, setCategories] = useState([]);
  const [datasetCategorized, setDatasetCategorized] = useState({});
  const [orderBy, setOrderBy] = useState("Rating");

  const filterDataset = (withKeyword) => {
    return dataset.filter((e) => {
      const longTerm = String(e.Book_title + e.Description).toLowerCase();
      return longTerm.includes(withKeyword.toLowerCase());
    });
  };

  const displayDataset = Object.keys(datasetCategorized).reduce(
    (acc, e) => [...acc, ...datasetCategorized[e]],
    []
  );

  const hoverBar = (e) => setHighlight(e.Book_title);
  const goodreadsLink = (s) => `https://www.goodreads.com/search?q=${s}`;

  const newCategory = (title, color) => ({
    Title: title,
    Color: color,
  });

  const getCurrentUsedColors = () => categories.map((e) => e.Color);
  const getOneAvailableColor = () => {
    const colors = getCurrentUsedColors();
    const availableColors = palette.filter((e) => !colors.includes(e));
    const randomFromAvailable =
      Math.floor(Math.random() * (availableColors.length - 0)) + 0;
    return availableColors[randomFromAvailable];
  };

  const onClickOrderBy = setOrderBy;

  const onChangedFilter = (e) => setFilter(e.target.value);

  const onCategorySubmit = (e) => {
    e.preventDefault();

    if (categories.find((cat) => cat.Title === filter)) {
      console.log("Repeated");
      return;
    }

    const lessThanFiveCategories = categories.length < 5;
    if (!lessThanFiveCategories) {
      console.log("Already too many categories");
      return;
    }

    const title = filter;
    const color = getOneAvailableColor();
    const category = newCategory(title, color);
    const newCategories = [...categories, category];
    setCategories(newCategories);

    const filteredDatased = filterDataset(title);
    const colorFiltered = filteredDatased.map((e) => ({ ...e, Color: color }));
    const byCategories = { ...datasetCategorized, [title]: colorFiltered };
    setDatasetCategorized(byCategories);

    setFilter("");
  };

  const onCategoryClicked = (category) => {
    const newCategories = categories.filter((e) => e.Title !== category);
    setCategories(newCategories);

    const byCategories = { ...datasetCategorized };
    delete byCategories[category];
    setDatasetCategorized(byCategories);
  };

  const CustomDropdown = () => (
    <DropdownButton
      id="dropdown-basic-button"
      title={`Compare with ${orderBy}`}
    >
      <Dropdown.Item onClick={() => onClickOrderBy("Rating")}>
        Rating
      </Dropdown.Item>
      <Dropdown.Item onClick={() => onClickOrderBy("Reviews")}>
        Reviews
      </Dropdown.Item>
      <Dropdown.Item onClick={() => onClickOrderBy("Number_Of_Pages")}>
        Number Of Pages
      </Dropdown.Item>
      <Dropdown.Item onClick={() => onClickOrderBy("Price")}>
        Price
      </Dropdown.Item>
    </DropdownButton>
  );

  return (
    <Container>
      <Row className="justify-content-md-center" style={{ marginTop: 30 }}>
        {categories.length === 0 ? (
          <Jumbotron fluid>
            <Container>
              <h1>Top 270 Computer Science</h1>
              <p>
                This tool allows you to create a comparative chart among
                different technology book types.
                <br />
                Try start by writing some of your preffered technologies or
                computer science topics on input below, any match with the book
                title or description will be added to the chart.
                <br />
                Up to 5 findings.
                <br />
              </p>
            </Container>
          </Jumbotron>
        ) : (
          <Chart data={displayDataset} onMouseEnter={hoverBar} yKey={orderBy} />
        )}
      </Row>
      <Row className="justify-content-md-center" style={{ marginTop: 10, marginBottom: 15 }}>
        {categories.map((e) => {
          return (
            <Badge
              pill
              key={e.Title + Date.now()}
              style={{ marginRight: 5, backgroundColor: e.Color }}
              onClick={() => onCategoryClicked(e.Title)}
            >
              {e.Title}
            </Badge>
          );
        })}
      </Row>
      <Row
        className="justify-content-md-center"
        style={{ marginTop: 5, marginBottom: 30 }}
      >
        <CustomDropdown />
      </Row>
      <Row>
        <Col>
          <Form onSubmit={onCategorySubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Filter by..."
                onChange={onChangedFilter}
                autoFocus
                value={filter}
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
                  key={e.Book_title + e.Color}
                  style={
                    highlight === e.Book_title
                      ? { backgroundColor: "light green" }
                      : {}
                  }
                >
                  <td>{e.Rating}</td>
                  <td>
                    <a
                      href={goodreadsLink(e.Book_title)}
                      target="_blank"
                      rel="noreferrer"
                    >
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
