import React, { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import cn from 'classnames';
import { UserNameContext } from '../userName-context';
import { asyncActions } from '../slices';
import { inputMessageSchema } from '../validate';

const getFieldClasses = ({ message }) => cn({
  'form-control': true,
  'mr-3': true,
  'is-invalid': !!message,
});

const NewMessageForm = () => {
  const userName = useContext(UserNameContext);
  const inputRef = useRef(null);
  const { t } = useTranslation();

  const { useSendMessageActions } = asyncActions;
  const { sendMessage } = useSendMessageActions();
  const { channelInfo: { currentChannelId } } = useSelector((state) => state);

  const handleSendMessage = async ({ message }, { resetForm }) => {
    try {
      await sendMessage({ currentChannelId, message, userName });
      resetForm({ values: '' });
    } catch (e) {
      console.error(e.message);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <Formik
      validationSchema={inputMessageSchema}
      validateOnBlur={false}
      initialValues={{ message: '' }}
      onSubmit={handleSendMessage}
    >
      {({ isSubmitting, errors }) => (
        <Form className="d-flex flex-wrap align-items-center">
          <Field
            as="textarea"
            type="text"
            id="message"
            name="message"
            className={getFieldClasses(errors)}
            readOnly={isSubmitting}
            innerRef={inputRef}
          />
          {errors.message ? <div className="invalid-feedback">{t(errors.message)}</div>
            : null}
          {isSubmitting ? (
            <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
              {t('sending')}
            </button>
          ) : <button className="btn btn-primary mt-1" type="submit">{t('send')}</button>}
        </Form>
      )}
    </Formik>
  );
};

export default NewMessageForm;
