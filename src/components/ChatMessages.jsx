import React from 'react';
import { useSelector } from 'react-redux';

const ChatMessages = () => {
  const сhannelMessages = useSelector((state) => {
    const { messagesInfo: { messages }, channelInfo: { currentChannelId } } = state;
    return messages.filter(
      ({ channelId }) => channelId === currentChannelId,
    );
  });
  return (
    <div className="chat-messages overflow-auto mb-3">
      {сhannelMessages.map(({ message, id, userName }) => (
        <div key={id}>
          <b>{userName}</b>
          {`: ${message}`}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
