import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const mapStateToProps = (state) => {
  const { modalsUIState } = state;
  const props = { modalsUIState };
  return props;
};

const actionCreators = {
  addChannelRequest: actions.addChannelRequest,
  modalsDisable: actions.modalsDisable,
  removeChannel: actions.removeChannel,
};

const spiner = (
  <div className="spinner-border text-danger" role="status">
    <span className="sr-only">Loading...</span>
  </div>
);

const Remove = (props) => {
  const { modalsUIState, modalsDisable, removeChannel } = props;
  const [error, setError] = React.useState('');
  const [isSubmitting, setSubmitting] = React.useState(false);
  const handleRemoveChannel = async () => {
    try {
      setSubmitting(true);
      await removeChannel(modalsUIState.id);
      setSubmitting(false);
      modalsDisable();
    } catch (e) {
      setError(e.message);
    }
  };

  const modal = (
    <Modal show={modalsUIState.state === 'remove'} onHide={modalsDisable}>
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
  return modal;
};

export default connect(mapStateToProps, actionCreators)(Remove);
