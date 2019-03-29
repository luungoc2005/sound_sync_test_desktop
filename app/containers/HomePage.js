// @flow
import React, { Component } from 'react';
import Home from '../components/Home';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { playerStateType } from '../reducers/types';
import Counter from '../components/Counter';
import * as PlayerActions from '../actions/player/actions';

function mapStateToProps(state) {
  return {
    player: state.player
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PlayerActions, dispatch);
}

type Props = {
  player: playerStateType;
};

export class HomePage extends Component<Props> {
  props: Props;

  render() {
    const { props } = this;
    return <Home {...props} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
