import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';
import cn from 'classnames';
import { actions, asyncActions } from '../../slices';
import { channelNameSchema } from '../../validate';
import { spiner } from '../utils';

const getFieldClasses = ({ channelName }) => cn({
  'form-control': true,
  'is-invalid': !!channelName,
});

const Rename = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { modal } = useSelector((state) => state);
  const { modalClose } = actions;
  const { useChannelActions } = asyncActions;
  const { renameChannelRequest } = useChannelActions();

  const handleModalClose = () => dispatch(modalClose());

  const handleRenameChannel = async ({ channelName }, { resetForm }) => {
    try {
      await renameChannelRequest(modal.extra.id, channelName);
      dispatch(modalClose());
      resetForm({ values: '' });
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <Modal show={modal.type === 'renameChannel'} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('renameTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={channelNameSchema}
          initialValues={{ channelName: '' }}
          onSubmit={handleRenameChannel}
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
              <button type="submit" className="btn btn-primary mt-2" disabled={isSubmitting}>{t('rename')}</button>
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

export default Rename;
