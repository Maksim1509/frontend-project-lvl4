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

const Remove = (props) => {
  const { modalsUIState, modalsDisable, removeChannel } = props;

  const handleRemoveChannel = () => {
    modalsDisable();
    removeChannel(modalsUIState.id);
  };

  const modal = (
    <Modal show={modalsUIState.state === 'remove'} onHide={modalsDisable}>
      <Modal.Header closeButton>
        <Modal.Title>Remove this channel?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="danger" onClick={handleRemoveChannel}>Remove</Button>
      </Modal.Footer>
    </Modal>
  );
  return modal;
};

export default connect(mapStateToProps, actionCreators)(Remove);
