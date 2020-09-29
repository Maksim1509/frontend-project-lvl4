import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import Add from './modals/Add';
import Remove from './modals/Remove';
import Rename from './modals/Rename';
import { actions } from '../slices';
import { editIcon, removeIcon } from './utils';

const mapStateToProps = (state) => {
  const { channelInfo: { channels, currentChannelId } } = state;
  return { channels, currentChannelId };
};

const actionCreators = {
  changeChannel: actions.changeChannel,
  modalOpen: actions.modalOpen,
};

const ChatChannels = (props) => {
  const {
    channels,
    currentChannelId,
    changeChannel,
    modalOpen,
  } = props;

  const handleChangeChannel = (id) => () => {
    if (id !== currentChannelId) {
      changeChannel({ id });
    }
  };

  const handleModalOpen = (type, extra = {}) => () => modalOpen({ type, extra });

  const handleRemoveChannel = (id) => () => {
    modalOpen({ type: 'removeChannel', extra: { id } });
  };
  const handleRenameChannel = (id) => () => {
    modalOpen({ type: 'renameChannel', extra: { id } });
  };

  const getButtonClasses = (id) => cn({
    'nav-link': true,
    btn: true,
    'btn-block': true,
    'pl-3': true,
    'text-left': true,
    active: id === currentChannelId,
  });

  const appendRemoveBtn = (id, removable) => (
    removable ? (
      <>
        <button type="button" className="btn btn-link p-1" value={id} onClick={handleRenameChannel(id)}>
          {editIcon}
        </button>
        <button type="button" className="btn btn-link ml-auto p-1" value={id} onClick={handleRemoveChannel(id)}>
          {removeIcon}
        </button>
      </>
    ) : null
  );

  const channelsList = (
    <ul className="nav flex-column nav-pills nav-fill">
      {channels.map(({ id, name, removable }) => (
        <li key={id} className="nav-item" style={{ display: 'flex' }}>
          <button
            type="button"
            className={getButtonClasses(id)}
            onClick={handleChangeChannel(id)}
          >
            {name}
          </button>
          {appendRemoveBtn(id, removable)}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>Channels</span>
          <button type="button" className="btn btn-link p-0 ml-auto" onClick={handleModalOpen('addChannel')}>
            +
          </button>
        </div>
        {channelsList}
      </div>
      <Add />
      <Remove />
      <Rename />
    </>
  );
};

export default connect(mapStateToProps, actionCreators)(ChatChannels);
