import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../../actions';

const spiner = (
  <div className="spinner-border spinner-border-sm text-primary" role="status">
    <span className="sr-only">Loading...</span>
  </div>
);

const getFieldClasses = ({ channelName }) => cn({
  'form-control': true,
  'is-invalid': !!channelName,
});

const mapStateToProps = (state) => {
  const { modalsUIState } = state;
  const props = { modalsUIState };
  return props;
};

const actionCreators = {
  modalsDisable: actions.modalsDisable,
  renameChannel: actions.renameChannel,
};

const validate = ({ channelName }) => {
  const errors = {};
  if (!channelName) {
    errors.channelName = 'Required';
  }
  return errors;
};

const Rename = (props) => {
  const { modalsDisable, modalsUIState, renameChannel } = props;
  const handleChannelRename = async ({ channelName }, { resetForm, setErrors }) => {
    try {
      await renameChannel(modalsUIState.id, channelName);
      modalsDisable();
      resetForm({ values: '' });
    } catch (e) {
      setErrors({ channelName: e.message });
    }
  };

  const modal = (
    <Modal show={modalsUIState.state === 'rename'} onHide={modalsDisable}>
      <Modal.Header closeButton>
        <Modal.Title>Rename this channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validate={validate}
          initialValues={{ channelName: '' }}
          onSubmit={handleChannelRename}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <Field
                id="channelName"
                name="channelName"
                className={getFieldClasses(errors)}
                onlyRead={isSubmitting}
              />
              {!!errors.channelName && <div className="invalid-feedback">{errors.channelName}</div>}
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Rename</button>
              {isSubmitting && spiner}
            </Form>
          )}
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
