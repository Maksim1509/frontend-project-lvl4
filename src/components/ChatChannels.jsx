import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const mapStateToProps = (state) => ({ channels: state.channels });

const actionCreators = {
  addChannel: actions.addChannel,
};

const ChatChannels = (props) => {
  const { channels } = props;
  const channelsList = (
    <ul className="nav flex-column nav-pills nav-fill">
      {channels.map(({ id, name }) => <li key={id} className="list-group-item">{name}</li>)}
    </ul>
  );
  return channelsList;
};

export default connect(mapStateToProps, actionCreators)(ChatChannels);
