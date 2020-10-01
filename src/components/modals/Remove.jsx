import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import connect from '../../connect';
import { asyncActions } from '../../slices';
import { spiner } from '../utils';

const Remove = (props) => {
  const { t } = useTranslation();
  const { modal } = useSelector((state) => state);
  const { modalClose } = props;
  const [isSubmitting, setSubmitting] = React.useState(false);

  const { useChannelActions } = asyncActions;
  const { removeChannelRequest } = useChannelActions();

  const handleRemoveChannel = async () => {
    setSubmitting(true);
    await removeChannelRequest(modal.extra.id);
    setSubmitting(false);
    modalClose();
  };

  return (
    <Modal show={modal.type === 'removeChannel'} onHide={modalClose}>
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

export default connect()(Remove);
