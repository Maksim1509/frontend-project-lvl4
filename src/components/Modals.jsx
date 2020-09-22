import React from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';

const setModal = (params, fn, show, setShow) => {
  const handleClose = () => setShow(false);
  const addChanellModal = (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add new channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: '' }}
          onSubmit={fn}
        >
          <Form>
            <Field
              id="channelName"
              name="channelName"
              className="form-control"
            />
            <Modal.Footer>
              <button type="submit" className="btn btn-primary">Add</button>
            </Modal.Footer>
          </Form>
        </Formik>
      </Modal.Body>
    </Modal>
  );
  const removeChanellModal = (
    <Modal
      show={show}
      onHide={fn}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Accept remove this channel!
      </Modal.Body>
    </Modal>
  );
  return params === 'addChannel' ? addChanellModal : removeChanellModal;
};

export default setModal;
