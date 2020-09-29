import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';
import cn from 'classnames';
import { actions, asyncActions } from '../../slices';

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
  const { modal } = state;
  const props = { modal };
  return props;
};

const actionCreators = {
  modalClose: actions.modalClose,
};

const validate = ({ channelName }) => {
  const errors = {};
  if (!channelName) {
    errors.channelName = 'Required';
  }
  return errors;
};

const Rename = (props) => {
  const { modalClose, modal } = props;
  const { useChannelActions } = asyncActions;
  const { renameChannelRequest } = useChannelActions();

  const handleModalClose = () => modalClose();

  const handleRenameChannel = async ({ channelName }, { resetForm, setErrors }) => {
    try {
      await renameChannelRequest(modal.extra.id, channelName);
      modalClose();
      resetForm({ values: '' });
    } catch (e) {
      setErrors({ channelName: e.message });
    }
  };

  return (
    <Modal show={modal.type === 'renameChannel'} onHide={modalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Rename this channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validate={validate}
          initialValues={{ channelName: '' }}
          onSubmit={handleRenameChannel}
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
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Rename</button>
              {isSubmitting && spiner}
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(mapStateToProps, actionCreators)(Rename);
