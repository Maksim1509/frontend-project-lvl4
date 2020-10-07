import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { actions } from '../slices';
import { editIcon, removeIcon } from './utils';

const renderChannelBtns = (id, renameFunc, removeFunc) => (
  <>
    <button type="button" className="btn btn-link p-1" value={id} onClick={renameFunc(id)}>
      {editIcon}
    </button>
    <button type="button" className="btn btn-link ml-auto p-1" value={id} onClick={removeFunc(id)}>
      {removeIcon}
    </button>
  </>
);

const getButtonClasses = (id, currentChannelId) => cn({
  'nav-link': true,
  btn: true,
  'btn-block': true,
  'pl-3': true,
  'text-left': true,
  active: id === currentChannelId,
});

const ChatChannels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channels, currentChannelId } = useSelector(({ channelInfo }) => channelInfo);
  const { changeChannel, modalOpen } = actions;

  const handleChangeChannel = (id) => () => {
    if (id !== currentChannelId) {
      dispatch(changeChannel({ id }));
    }
  };

  const handleModalOpen = (type, extra = {}) => () => dispatch(modalOpen({ type, extra }));

  const handleRemoveChannel = (id) => () => {
    dispatch(modalOpen({ type: 'removeChannel', extra: { id } }));
  };
  const handleRenameChannel = (id) => () => {
    dispatch(modalOpen({ type: 'renameChannel', extra: { id } }));
  };

  const channelsList = (
    <ul className="nav flex-column nav-pills nav-fill">
      {channels.map(({ id, name, removable }) => (
        <li key={id} className="nav-item" style={{ display: 'flex' }}>
          <button
            type="button"
            className={getButtonClasses(id, currentChannelId)}
            onClick={handleChangeChannel(id)}
          >
            {name}
          </button>
          {removable && renderChannelBtns(id, handleRenameChannel, handleRemoveChannel)}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>{t('channels')}</span>
        <button type="button" className="btn btn-link p-0 ml-auto" onClick={handleModalOpen('addChannel')}>
          +
        </button>
      </div>
      {channelsList}
    </div>
  );
};

export default ChatChannels;
