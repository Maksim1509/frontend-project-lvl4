import React from 'react';
import ChatChannels from './ChatChannels';
import NewMessageForm from './NewMessageForm';
import ChatMessages from './ChatMessages';
import { UserNameContext, userName } from '../userName-context';

const App = () => (
  <UserNameContext.Provider value={userName}>
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
  </UserNameContext.Provider>
);

export default App;
