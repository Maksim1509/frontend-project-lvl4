import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';
import cn from 'classnames';
import connect from '../../connect';
import { asyncActions } from '../../slices';
import validate from './validate';
import { spiner } from '../utils';

const getFieldClasses = ({ channelName }) => cn({
  'form-control': true,
  'is-invalid': !!channelName,
});

const Add = (props) => {
  const { t } = useTranslation();
  const { modal } = useSelector((state) => state);
  const { useChannelActions } = asyncActions;
  const { addChannelRequest } = useChannelActions();
  const { modalClose } = props;

  const handleAddChannel = async ({ channelName }, { resetForm }) => {
    await addChannelRequest(channelName);
    modalClose();
    resetForm({ values: '' });
  };
  const handleModalClose = () => modalClose();

  return (
    <Modal show={modal.type === 'addChannel'} onHide={modalClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('addTitle')}</Modal.Title>
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

export default connect()(Add);
