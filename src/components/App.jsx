import React from 'react';
import ChatChannels from './ChatChannels';
import NewMessageForm from './NewMessageForm';
import ChatMessages from './ChatMessages';

const App = () => (
  <div className="row h-100 pb-3">
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="btn btn-link p-0 ml-auto">+</button>
      </div>
      <ChatChannels />
    </div>
    <div>
      <ChatMessages />
      <div className="col h-100">
        <NewMessageForm />
      </div>
    </div>
  </div>
);

export default App;
