// @flow
import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

import { Row, Button } from 'antd';

type Props = {};

const SYNC_INTERVAL = 1000;

export default class Home extends Component<Props> {
  props: Props
  videoElement = createRef()
  intervalHandle = null;

  constructor(props) {
    super(props);

    intervalHandle = setInterval(this.handleOnSync, SYNC_INTERVAL);
  }

  componentWillUnmount() {
    if (intervalHandle) clearInterval(intervalHandle);
  }

  handleCreateChannel = () => this.props.createClient()

  handleEndChannel = () => this.props.endClient()

  handleStartPlayer = () => this.props.startPlayer()

  handleOnPlay = () => {
    if (this.videoElement.current) {
      this.props.handleOnPlay(this.videoElement.current.currentTime);
    }
  }

  handleOnPause = () => {
    if (this.videoElement.current) {
      this.props.handleOnPause(this.videoElement.current.currentTime);
    }
  }

  handleOnSeeking = () => {
    if (this.videoElement.current) {
      this.props.handleOnSeeking(this.videoElement.current.currentTime);
    }
  }

  handleOnSeeked = () => {
    if (this.videoElement.current) {
      this.props.handleOnSeeked(this.videoElement.current.currentTime);
    }
  }

  handleOnSync = () => {
    if (this.videoElement.current && !this.videoElement.paused) {
      this.props.handleOnSync(this.videoElement.current.currentTime);
    }
  }

  render() {
    const { 
      channelId, 
      hostname, 
      fileOpening,
      fileName,
    } = this.props.player;

    return (
      <div>
        <Row>
          <h2>Home</h2>
        </Row>
        <Row>
          <div>Current hostname: {hostname}</div>
          <div>Active channel Id: {channelId}</div>
        </Row>
        <Row>
          {!channelId
          ? <Button 
              type='primary' 
              disabled={!new Boolean(channelId)}
              onClick={this.handleCreateChannel}
            >
              Create Channel
            </Button>
          : <Button 
              type='primary' 
              disabled={!new Boolean(channelId)}
              onClick={this.handleEndChannel}
            >
              Disconnect
            </Button>}
          <Button
            type='default'
            disabled={!channelId || fileOpening}
            onClick={this.handleStartPlayer}
          >
            Open Video...
          </Button>
          {/* <Link to={routes.COUNTER}>to Counter</Link> */}
        </Row>
        <Row>
          {(!fileOpening && fileName) && 
          <video
            ref={this.videoElement}
            controls
            onPlay={this.handleOnPlay}
            onPause={this.handleOnPause}
            onSeeking={this.handleOnSeeking}
            onSeeked={this.handleOnSeeked}
          >
            <source src={fileName} type="video/mp4"></source>
          </video>}
        </Row>
      </div>
    );
  }
}
