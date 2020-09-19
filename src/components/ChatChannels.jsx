import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { Modal } from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';
import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { channels, currentChannelId } = state;
  return { channels, currentChannelId };
};

const actionCreators = {
  addChannelRequest: actions.addChannelRequest,
  changeChannel: actions.changeChannel,
};

const ChatChannels = (props) => {
  const {
    channels,
    currentChannelId,
    changeChannel,
    addChannelRequest,
  } = props;

  const handleChangeChannel = (id) => () => {
    if (id !== currentChannelId) changeChannel({ id });
  };

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChannelAdd = ({ channelName }, { resetForm }) => {
    addChannelRequest(channelName);
    resetForm({ values: '' });
    handleClose();
  };

  const getButtonClasses = (id) => cn({
    'nav-link': true,
    btn: true,
    'btn-block': true,
    active: id === currentChannelId,
  });

  const appendRemoveBtn = (removable) => (
    removable ? <button type="button" className="btn btn-link ml-auto" onClick={handleShow}>x</button>
      : null
  );
  const channelsList = (
    <ul className="nav flex-column nav-pills nav-fill">
      {channels.map(({ id, name, removable }) => (
        <li key={id} className="nav-item" style={{ display: 'flex' }}>
          <button
            type="button"
            className={getButtonClasses(id)}
            onClick={handleChangeChannel(id)}
          >
            {name}
          </button>
          {appendRemoveBtn(removable)}
        </li>
      ))}
    </ul>
  );
  return (
    <>
      <div className="col-3 border-right">
        <div className="d-flex mb-2">
          <span>Channels</span>
          <button type="button" className="btn btn-link p-0 ml-auto" onClick={handleShow}>+</button>
        </div>
        {channelsList}
      </div>
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
            onSubmit={handleChannelAdd}
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
    </>
  );
};

export default connect(mapStateToProps, actionCreators)(ChatChannels);
