import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions';
import Add from './modals/Add';
import Remove from './modals/Remove';
import Rename from './modals/Rename';

const mapStateToProps = (state) => {
  const { channels, currentChannelId } = state;
  return { channels, currentChannelId };
};

const actionCreators = {
  modalAddEnable: actions.modalAddEnable,
  modalRemoveEnable: actions.modalRemoveEnable,
  modalRenameEnable: actions.modalRenameEnable,
  changeChannel: actions.changeChannel,
};

const ChatChannels = (props) => {
  const {
    channels,
    currentChannelId,
    changeChannel,
    modalAddEnable,
    modalRemoveEnable,
    modalRenameEnable,
  } = props;

  const handleChangeChannel = (id) => () => {
    if (id !== currentChannelId) changeChannel({ id });
  };

  const handleRemoveChannel = (id) => () => {
    modalRemoveEnable({ id });
  };
  const handleRenameChannel = (id) => () => {
    modalRenameEnable({ id });
  };

  const getButtonClasses = (id) => cn({
    'nav-link': true,
    btn: true,
    'btn-block': true,
    active: id === currentChannelId,
  });

  const appendRemoveBtn = (id, removable) => (
    removable
      ? (
        <>
          <button type="button" className="btn btn-link ml-auto" value={id} onClick={handleRemoveChannel(id)}>x</button>
          <button type="button" className="btn btn-primary ml-auto" value={id} onClick={handleRenameChannel(id)}>rename</button>
        </>
      )
      : null
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
          <button type="button" className="btn btn-link p-0 ml-auto" onClick={modalAddEnable}>+</button>
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
