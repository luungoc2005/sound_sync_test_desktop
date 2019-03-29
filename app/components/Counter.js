// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

type Props = {
  increment: () => void,
  incrementIfOdd: () => void,
  incrementAsync: () => void,
  decrement: () => void,
  counter: number
};

export default class Counter extends Component<Props> {
  props: Props;

  render() {
    const {
      
    } = this.props;
    return (
      <div>

      </div>
    );
  }
}
