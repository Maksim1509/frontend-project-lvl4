import React from 'react';
import Rollbar from 'rollbar';
import ChatChannels from './ChatChannels';
import NewMessageForm from './NewMessageForm';
import ChatMessages from './ChatMessages';

const App = () => {
  React.useState({
    rollbar: new Rollbar({
      accessToken: 'ebb2df6bc2b84f66b05a056a064cc5c5',
      captureUncaught: true,
      captureUnhandledRejections: true,
    }),
  });

  return (
    <div className="row h-100 pb-3">
      <ChatChannels />
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <ChatMessages />
          <div className="mt-auto">
            <NewMessageForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
