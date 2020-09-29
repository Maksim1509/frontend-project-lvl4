import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';
import cn from 'classnames';
import { actions, asyncActions } from '../../slices';
import validate from './validate';
import { spiner } from '../utils';

const mapStateToProps = (state) => {
  const { modal } = state;
  const props = { modal };
  return props;
};

const actionCreators = {
  addChannel: actions.addChannel,
  modalClose: actions.modalClose,
};

const getFieldClasses = ({ channelName }) => cn({
  'form-control': true,
  'is-invalid': !!channelName,
});

const Add = (props) => {
  const { modalClose, modal } = props;
  const { useChannelActions } = asyncActions;
  const { addChannelRequest } = useChannelActions();

  const handleAddChannel = async ({ channelName }, { resetForm, setErrors }) => {
    try {
      await addChannelRequest(channelName);
      modalClose();
      resetForm({ values: '' });
    } catch (e) {
      setErrors({ channelName: e.message });
    }
  };
  const handleModalClose = () => modalClose();

  return (
    <Modal show={modal.type === 'addChannel'} onHide={modalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add new channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validate={validate}
          initialValues={{ channelName: '' }}
          onSubmit={handleAddChannel}
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
        <Button variant="secondary" onClick={handleModalClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(mapStateToProps, actionCreators)(Add);
