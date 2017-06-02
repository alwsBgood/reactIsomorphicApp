import React, { Component, PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import './Counter.css';

const propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.number
};

const defaultProps = {
  omClick: () => {},
  value: 0
}

