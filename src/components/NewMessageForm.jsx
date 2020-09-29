import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import cn from 'classnames';
import { UserNameContext } from '../userName-context';
import { asyncActions } from '../slices';

const mapStateToProps = (state) => {
  const { channelInfo: { currentChannelId } } = state;
  const props = { currentChannelId };
  return props;
};

const validate = (values) => {
  const errors = {};
  if (!values.message) {
    errors.message = 'Required';
  }
  return errors;
};

const getFieldClasses = ({ message }) => cn({
  'form-control': true,
  'w-75': true,
  'mr-3': true,
  'is-invalid': !!message,
});

const NewMessageForm = (props) => {
  const userName = useContext(UserNameContext);

  const { useSendMessageActions } = asyncActions;
  const { sendMessage } = useSendMessageActions();
  const { currentChannelId } = props;
  const form = (
    <Formik
      validate={validate}
      initialValues={{ message: '' }}
      onSubmit={({ message }, { resetForm, setErrors }) => {
        try {
          sendMessage({ currentChannelId, message, userName });
          resetForm({ values: '' });
        } catch (e) {
          setErrors({ message: e.message });
        }
      }}
    >
      {({ isSubmitting, errors }) => (
        <Form className="d-flex flex-wrap">
          <Field
            type="text"
            id="message"
            name="message"
            className={getFieldClasses(errors)}
            readOnly={isSubmitting}
          />
          {isSubmitting ? (
            <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
              Sending...
            </button>
          ) : <button className="btn btn-primary" type="submit">Send</button>}
          {errors.message ? <div className="invalid-feedback">{errors.message}</div>
            : null}
        </Form>
      )}
    </Formik>
  );
  return form;
};

export default connect(mapStateToProps)(NewMessageForm);
