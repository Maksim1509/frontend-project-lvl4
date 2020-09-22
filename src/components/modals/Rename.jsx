import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const mapStateToProps = (state) => {
  const { modalsUIState } = state;
  const props = { modalsUIState };
  return props;
};

const actionCreators = {
  modalsDisable: actions.modalsDisable,
  renameChannel: actions.renameChannel,
};

const Rename = (props) => {
  const { modalsDisable, modalsUIState, renameChannel } = props;
  const handleChannelRename = ({ channelName }, { resetForm }) => {
    modalsDisable();
    renameChannel(modalsUIState.id, channelName);
    resetForm({ values: '' });
  };

  const modal = (
    <Modal show={modalsUIState.state === 'rename'} onHide={modalsDisable}>
      <Modal.Header closeButton>
        <Modal.Title>Rename this channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: '' }}
          onSubmit={handleChannelRename}
        >
          <Form>
            <Field
              id="channelName"
              name="channelName"
              className="form-control"
            />
            <button type="submit" className="btn btn-primary">Rename</button>
          </Form>
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={modalsDisable}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
  return modal;
};

export default connect(mapStateToProps, actionCreators)(Rename);
