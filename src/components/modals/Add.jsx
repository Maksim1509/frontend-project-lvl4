import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';
import cn from 'classnames';
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

const validate = ({ channelName }) => {
  const errors = {};
  if (!channelName) {
    errors.channelName = 'Required';
  }
  return errors;
};

const spiner = (
  <div className="spinner-border spinner-border-sm text-primary" role="status">
    <span className="sr-only">Loading...</span>
  </div>
);
const getFieldClasses = ({ channelName }) => cn({
  'form-control': true,
  'is-invalid': !!channelName,
});
const Add = (props) => {
  const { addChannelRequest, modalsDisable, modalsUIState } = props;
  const handleChannelAdd = async ({ channelName }, { resetForm, setErrors }) => {
    try {
      await addChannelRequest(channelName);
      modalsDisable();
      resetForm({ values: '' });
    } catch (e) {
      setErrors({ channelName: e.message });
    }
  };
  const disableModals = () => modalsDisable();
  const modal = (
    <Modal show={modalsUIState === 'add'} onHide={modalsDisable}>
      <Modal.Header closeButton>
        <Modal.Title>Add new channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validate={validate}
          initialValues={{ channelName: '' }}
          onSubmit={handleChannelAdd}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <Field
                id="channelName"
                name="channelName"
                className={getFieldClasses(errors)}
                readOnly={isSubmitting}
              />
              {!!errors.channelName && <div className="invalid-feedback">{errors.channelName}</div>}
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Add</button>
              {isSubmitting && spiner}
            </Form>
          )}
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
