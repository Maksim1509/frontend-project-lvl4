import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';
import cn from 'classnames';
import { actions, asyncActions } from '../../slices';
import validate from './validate';
import { spiner } from '../utils';

const getFieldClasses = ({ channelName }) => cn({
  'form-control': true,
  'is-invalid': !!channelName,
});

const mapStateToProps = (state) => {
  const { modal } = state;
  const props = { modal };
  return props;
};

const actionCreators = {
  modalClose: actions.modalClose,
};

const Rename = (props) => {
  const { t } = useTranslation();
  const { modalClose, modal } = props;
  const { useChannelActions } = asyncActions;
  const { renameChannelRequest } = useChannelActions();

  const handleModalClose = () => modalClose();

  const handleRenameChannel = async ({ channelName }, { resetForm, setErrors }) => {
    try {
      await renameChannelRequest(modal.extra.id, channelName);
      modalClose();
      resetForm({ values: '' });
    } catch (e) {
      setErrors({ channelName: e.message });
    }
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

export default connect(mapStateToProps, actionCreators)(Rename);
