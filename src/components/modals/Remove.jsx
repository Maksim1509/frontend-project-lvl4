import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actions, asyncActions } from '../../slices';
import { spiner } from '../utils';

const mapStateToProps = ({ modal }) => ({ modal });

const actionCreators = {
  modalClose: actions.modalClose,
};

const Remove = (props) => {
  const { t } = useTranslation();
  const { modal, modalClose } = props;
  const [error, setError] = React.useState('');
  const [isSubmitting, setSubmitting] = React.useState(false);

  const { useChannelActions } = asyncActions;
  const { removeChannelRequest } = useChannelActions();

  const handleRemoveChannel = async () => {
    try {
      setSubmitting(true);
      await removeChannelRequest(modal.extra.id);
      setSubmitting(false);
      modalClose();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Modal show={modal.type === 'removeChannel'} onHide={modalClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('removeTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Footer className="d-block">
        <Button variant="danger" disabled={isSubmitting} onClick={handleRemoveChannel}>{t('remove')}</Button>
        {isSubmitting && spiner}
        {!!error && <div className="text-danger">{t(error)}</div>}
      </Modal.Footer>
    </Modal>
  );
};

export default connect(mapStateToProps, actionCreators)(Remove);
