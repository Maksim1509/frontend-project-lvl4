import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import cn from 'classnames';
import { UserNameContext } from '../userName-context';
import { asyncActions } from '../slices';
import connect from '../connect';

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

const NewMessageForm = () => {
  const userName = useContext(UserNameContext);
  const { t } = useTranslation();

  const { useSendMessageActions } = asyncActions;
  const { sendMessage } = useSendMessageActions();
  const { channelInfo: { currentChannelId } } = useSelector((state) => state);

  const handleSendMessage = async ({ message }, { resetForm }) => {
    await sendMessage({ currentChannelId, message, userName });
    resetForm({ values: '' });
  };

  return (
    <Formik
      validate={validate}
      initialValues={{ message: '' }}
      onSubmit={handleSendMessage}
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
              {t('sending')}
            </button>
          ) : <button className="btn btn-primary" type="submit">{t('send')}</button>}
          {errors.message ? <div className="invalid-feedback">{t(errors.message)}</div>
            : null}
        </Form>
      )}
    </Formik>
  );
};

export default connect()(NewMessageForm);
