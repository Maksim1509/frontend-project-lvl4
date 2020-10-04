import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { actions, asyncActions } from '../../slices';
import { spiner } from '../utils';

const Remove = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { modal } = useSelector((state) => state);
  const { modalClose } = actions;
  const [isSubmitting, setSubmitting] = React.useState(false);

  const { useChannelActions } = asyncActions;
  const { removeChannelRequest } = useChannelActions();

  const handleRemoveChannel = async () => {
    setSubmitting(true);
    await removeChannelRequest(modal.extra.id);
    setSubmitting(false);
    dispatch(modalClose());
  };

  const handleModalClose = () => dispatch(modalClose());

  return (
    <Modal show={modal.type === 'removeChannel'} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('removeTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Footer className="d-block">
        <Button variant="danger" disabled={isSubmitting} onClick={handleRemoveChannel}>{t('remove')}</Button>
        {isSubmitting && spiner}
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
