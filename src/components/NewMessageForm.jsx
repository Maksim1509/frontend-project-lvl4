import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import * as actions from '../actions';
import { UserNameContext } from '../userName-context';

const actionCreators = {
  sendingMessage: actions.sendingMessage,
};

const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  const props = { currentChannelId };
  return props;
};

class NewMessageForm extends React.Component {
  handleSubmit = async (messageText) => {
    const { sendingMessage, currentChannelId } = this.props;
    try {
      await sendingMessage(currentChannelId, messageText, this.context);
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const form = (
      <Formik
        initialValues={{ message: '' }}
        onSubmit={(values, { resetForm }) => {
          this.handleSubmit(values);
          resetForm({ values: '' });
        }}
      >
        <Form>
          <Field
            id="message"
            name="message"
            className="form-control"
          />
        </Form>
      </Formik>
    );
    return form;
  }
}

NewMessageForm.contextType = UserNameContext;

export default connect(mapStateToProps, actionCreators)(NewMessageForm);
