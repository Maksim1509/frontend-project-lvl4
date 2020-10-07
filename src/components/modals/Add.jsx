import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';
import cn from 'classnames';
import { actions, asyncActions } from '../../slices';
import { spiner } from '../utils';
import { channelNameSchema } from '../../validate';

const getFieldClasses = ({ channelName }) => cn({
  'form-control': true,
  'is-invalid': !!channelName,
});

const { modalClose } = actions;
const { useChannelActions } = asyncActions;
const { addChannelRequest } = useChannelActions();

const Add = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { modal } = useSelector((state) => state);
  const handleAddChannel = async ({ channelName }, { resetForm }) => {
    try {
      await addChannelRequest(channelName);
      dispatch(modalClose());
      resetForm({ values: '' });
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleModalClose = () => dispatch(modalClose());
  const inputRef = useRef(null);
  useEffect(() => {
    if (modal.type === 'addChannel') {
      inputRef.current.focus();
    }
  });

  return (
    <Modal show={modal.type === 'addChannel'} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('addTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={channelNameSchema}
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
                innerRef={inputRef}
              />
              {!!errors.channelName && <div className="invalid-feedback">{t(errors.channelName)}</div>}
              <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>{t('add')}</button>
              {isSubmitting && spiner}
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>{t('close')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Add;
