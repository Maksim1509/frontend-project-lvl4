import React from 'react';
import Rollbar from 'rollbar';
import ChatChannels from './ChatChannels';
import NewMessageForm from './NewMessageForm';
import ChatMessages from './ChatMessages';
import { UserNameContext, userName } from '../userName-context';

const App = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     rollbar: new Rollbar({
  //       accessToken: 'ebb2df6bc2b84f66b05a056a064cc5c5',
  //       captureUncaught: true,
  //       captureUnhandledRejections: true,
  //     }),
  //   };
  //   this.logInfo = this.logInfo.bind(this);
  //   this.throwError = this.throwError.bind(this);
  // }

  const [rollbar] = React.useState({
    rollbar: new Rollbar({
      accessToken: 'ebb2df6bc2b84f66b05a056a064cc5c5',
      captureUncaught: true,
      captureUnhandledRejections: true,
    }),
  });

  return (
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
};

export default App;
