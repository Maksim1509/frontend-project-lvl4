import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { messages } = state;
  const props = { messages };
  return props;
};

const ChatMessages = (props) => {
  const { messages } = props;
  console.log(messages);
  return (
    <div>
      {messages.map(({ message, id }) => <li key={id}>{message}</li>)}
    </div>
  );
};

export default connect(mapStateToProps)(ChatMessages);
