import React from 'react';

// {
//   channels: [
//     {id: 1, name: "general", removable: false},
//     {id: 2, name: "random", removable: false},
//   ],
//   currentChannelId: 1,
//   messages: [],
// }

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const { gon } = this.props;
    this.state = {
      channels: [...gon.channels],
      currentChannelId: gon.currentChannelId,
      messages: [...gon.messages],
    };
  }

  renderChannels() {
    const { channels } = this.state;
    if (channels.length === 0) {
      return null;
    }
    return (
      <ul className="list-group col-12 col-md-4">
        {channels.map(({ id, name }) => <li key={id} className="list-group-item">{name}</li>)}
      </ul>
    );
  }

  render() {
    return this.renderChannels();
  }
}
