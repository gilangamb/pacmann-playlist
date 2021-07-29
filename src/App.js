import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Navbar, Accordion, Nav, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Detail from "./detail";

import "./App.css";

function App() {
  const [playlist, setPlaylist] = useState(() => []);

  useEffect(async () => {
    try {
      await fetch(
        "https://s3-ap-southeast-1.amazonaws.com/pacmannai.com/static/json/playlist.json"
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data?.data);
          setPlaylist(data?.data);
        });
    } catch (error) {}
  }, []);

  // window.onload = async function () {
  //   try {
  //     await fetch(
  //       "https://s3-ap-southeast-1.amazonaws.com/pacmannai.com/static/json/playlist.json"
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data?.data);
  //         setPlaylist(data?.data);
  //       });
  //   } catch (error) {}
  // };

  return (
    <div className="App">
      <Router>
        <Navbar bg="dark" expand="md">
          <Container>
            <Navbar.Brand href="#home" className="text-white">
              My Playlist
            </Navbar.Brand>
          </Container>
        </Navbar>

        <div className="row align-items-start">
          <div className="col-md-4">
            <Accordion defaultActiveKey="0">
              {playlist.map((item, index) => {
                return (
                  <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>{item.name}</Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        {item.videos.map((item2, id) => (
                          <li key={id}>
                            <Link
                              to={`/video/${item2.url.replace(
                                "https://www.youtube.com/embed/",
                                ""
                              )}`}
                            >
                              <a href="#" className="btn">
                                {item2.title}
                              </a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          </div>

          <div className="col-md-8">
            <Route path={`/video/:url`}>
              <Detail />
            </Route>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
