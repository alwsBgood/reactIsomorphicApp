import React, { Component, PropTypes } from 'react';
import Grid  from 'react-bootstrap/lib/Grid';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem  from 'react-bootstrap/lib/NavItem';
import './bootstrap.css';


import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { Link } from 'react-router';

const propTypes = {
  children : PropTypes.node
};

class App extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <span>Hello World</span>
              <Link to='/'>Hello World</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav navbar>
              <LinkContainer to='/time'>
                <NavItem>Время</NavItem>
              </LinkContainer>
              <LinkContainer to='/counters'>
                <NavItem>Счетчики</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Grid>
          {this.props.children}
        </Grid>
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
