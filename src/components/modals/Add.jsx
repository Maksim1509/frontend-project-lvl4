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
  addChannelRequest: actions.addChannelRequest,
  modalsDisable: actions.modalsDisable,
};

const Add = (props) => {
  const { addChannelRequest, modalsDisable, modalsUIState } = props;
  const handleChannelAdd = ({ channelName }, { resetForm }) => {
    modalsDisable();
    addChannelRequest(channelName);
    resetForm({ values: '' });
  };
  const disableModals = () => modalsDisable();
  const modal = (
    <Modal show={modalsUIState === 'add'} onHide={modalsDisable}>
      <Modal.Header closeButton>
        <Modal.Title>Add new channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: '' }}
          onSubmit={handleChannelAdd}
        >
          <Form>
            <Field
              id="channelName"
              name="channelName"
              className="form-control"
            />
            <button type="submit" className="btn btn-primary">Add</button>
          </Form>
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={disableModals}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
  return modal;
};

export default connect(mapStateToProps, actionCreators)(Add);
