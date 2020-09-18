import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { messages, currentChannelId } = state;
  const currentChannelMessages = messages.filter(
    ({ channelId }) => channelId === currentChannelId,
  );
  const props = { currentChannelMessages, currentChannelId };
  return props;
};

const ChatMessages = (props) => {
  const { currentChannelMessages } = props;
  console.log(currentChannelMessages);
  return (
    <div className="chat-messages overflow-auto mb-3">
      {currentChannelMessages.map(({ message, id, userName }) => (
        <div key={id}>
          <b>{userName}</b>
          {`: ${message}`}
        </div>
      ))}
    </div>
  );
};

export default connect(mapStateToProps)(ChatMessages);
