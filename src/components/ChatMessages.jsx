import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const renderMessage = (lastIndex, ref) => (
  { message, id, userName }, index,
) => (index === lastIndex ? (
  <div key={id} ref={ref} className="text-break">
    <b>{userName}</b>
    {`: ${message}`}
  </div>
) : (
  <div key={id} className="text-break">
    <b>{userName}</b>
    {`: ${message}`}
  </div>
));

const ChatMessages = () => {
  const сhannelMessages = useSelector((state) => {
    const { messagesInfo: { messages }, channelInfo: { currentChannelId } } = state;
    return messages.filter(
      ({ channelId }) => channelId === currentChannelId,
    );
  });
  const lastMessageRef = useRef(null);
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView(false);
    }
  });
  const lastMessageIndex = сhannelMessages.length - 1;
  return (
    <div className="chat-messages overflow-auto mb-3">
      {сhannelMessages.map(renderMessage(lastMessageIndex, lastMessageRef))}
    </div>
  );
};

export default ChatMessages;
