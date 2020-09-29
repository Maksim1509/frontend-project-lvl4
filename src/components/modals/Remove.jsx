import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actions, asyncActions } from '../../slices';

const mapStateToProps = (state) => {
  const { modal } = state;
  const props = { modal };
  return props;
};

const actionCreators = {
  modalClose: actions.modalClose,
};

const spiner = (
  <div className="spinner-border text-danger" role="status">
    <span className="sr-only">Loading...</span>
  </div>
);

const Remove = (props) => {
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
        <Modal.Title>Remove this channel?</Modal.Title>
      </Modal.Header>
      <Modal.Footer className="d-block">
        <Button variant="danger" disabled={isSubmitting} onClick={handleRemoveChannel}>Remove</Button>
        {isSubmitting && spiner}
        {!!error && <div className="text-danger">{error}</div>}
      </Modal.Footer>
    </Modal>
  );
};

export default connect(mapStateToProps, actionCreators)(Remove);
