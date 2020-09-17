import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { channels, currentChannelId } = state;
  return { channels, currentChannelId };
};

const actionCreators = {
  addChannel: actions.addChannel,
  changeChannel: actions.changeChannel,
};

const ChatChannels = (props) => {
  const { channels, currentChannelId, changeChannel } = props;

  const handleChangeChannel = (id) => () => {
    if (id !== currentChannelId) changeChannel({ id });
  };

  const getButtonClasses = (id) => cn({
    'nav-link': true,
    btn: true,
    'btn-block': true,
    active: id === currentChannelId,
  });

  const channelsList = (
    <ul className="nav flex-column nav-pills nav-fill">
      {channels.map(({ id, name }) => (
        <li key={id} className="nav-item">
          <button
            type="button"
            className={getButtonClasses(id)}
            onClick={handleChangeChannel(id)}
          >
            {name}
          </button>
        </li>
      ))}
    </ul>
  );
  return channelsList;
};

export default connect(mapStateToProps, actionCreators)(ChatChannels);
