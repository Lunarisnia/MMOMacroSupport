import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import './App.global.css';
import { useHotkeys } from 'react-hotkeys-hook';

const Timers = (props: any) => {
  const { shortcut } = props;
  const [count, setCount] = useState(0);
  const [onCooldown, setOnCooldown] = useState(false);
  useHotkeys(shortcut, () => setOnCooldown(true));

  useEffect(() => {
    if (onCooldown) {
      const timer = setTimeout(() => {
        if (count > 0) setCount(count - 1);
        if (count <= 0) {
          setOnCooldown(false);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
    return () => null;
  });

  return (
    <div>
      <Container fluid>
        <Row className="justify-content-md-center">
          <h1>Benediction</h1>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Form.Group>
              <Form.Control
                className="text-center"
                type="text"
                placeholder="Small text"
                pattern="[0-9]*"
                maxLength={3}
                value={count}
                readOnly={onCooldown}
                // eslint-disable-next-line radix
                onChange={(e) => setCount(parseInt(e.target.value) || 0)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Button
              size="lg"
              variant="primary"
              onClick={() => setOnCooldown(true)}
              disabled={onCooldown}
            >
              Countdown
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const Homepage = () => {
  return (
    <div>
      {/** The start of the input bar component */}
      <Row>
        <Col>
          <Container>
            <br />
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Button
                  style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
                  variant="danger"
                >
                  Record
                </Button>
              </Col>
              <Col md={2}>
                <Button
                  style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
                  onClick={() => {
                    // const id = ioHook.registerShortcut([29, 65], (keys) => {
                    //   console.log('Shortcut called with keys:', keys);
                    // });
                  }}
                >
                  Confirm
                </Button>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      {/** The end of the input bar component */}
      <Container fluid>
        <br />
        <Row>
          <Col>
            <br />
            <Timers shortcut="command+1" />
          </Col>
          <Col>
            <br />
            <Timers shortcut="command+2" />
          </Col>
          <Col>
            <br />
            <Timers shortcut="command+3" />
          </Col>
          <Col>
            <br />
            <Timers shortcut="command+4" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Homepage} />
      </Switch>
    </Router>
  );
}
