import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import * as actions from '../actions';

const actionCreators = {
  sendingMessage: actions.sendingMessage,
};

const mapStateToProps = (state) => {
  const { channels: { 0: { id } } } = state;
  const props = { id };
  return props;
};

const NewMessageForm = (props) => {
  const handleSubmit = async (messageText) => {
    const { sendingMessage, id } = props;
    try {
      await sendingMessage(id, messageText);
    } catch (e) {
      console.error(e);
    }
  };
  const form = (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={(values) => {
        console.log(values);
        handleSubmit(values);
      }}
    >
      <Form>
        <Field
          id="message"
          name="message"
        />
      </Form>
    </Formik>
  );
  return form;
};
export default connect(mapStateToProps, actionCreators)(NewMessageForm);
