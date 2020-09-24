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
    throw new Error('1111');
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
    'pl-3': true,
    'text-left': true,
    active: id === currentChannelId,
  });

  const appendRemoveBtn = (id, removable) => (
    removable
      ? (
        <>
          <button type="button" className="btn btn-link p-1" value={id} onClick={handleRenameChannel(id)}>
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            </svg>
          </button>
          <button type="button" className="btn btn-link ml-auto p-1" value={id} onClick={handleRemoveChannel(id)}>
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
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
