import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { messages } = state;
  const props = { messages };
  return props;
};

const ChatMessages = (props) => {
  const { messages } = props;

  return (
    <div className="chat-messages overflow-auto mb-3">
      {messages.map(({ message, id, userName }) => (
        <div key={id}>
          <b>{userName}</b>
          {`: ${message}`}
        </div>
      ))}
    </div>
  );
};

export default connect(mapStateToProps)(ChatMessages);
