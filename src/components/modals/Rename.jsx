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

const Rename = (props) => {
  const { t } = useTranslation();
  const { modal } = useSelector((state) => state);
  const { modalClose } = props;
  const { useChannelActions } = asyncActions;
  const { renameChannelRequest } = useChannelActions();

  const handleModalClose = () => modalClose();

  const handleRenameChannel = async ({ channelName }, { resetForm }) => {
    await renameChannelRequest(modal.extra.id, channelName);
    modalClose();
    resetForm({ values: '' });
  };

  return (
    <Modal show={modal.type === 'renameChannel'} onHide={modalClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('renameTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validate={validate}
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

export default connect()(Rename);
