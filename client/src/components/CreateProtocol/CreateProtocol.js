import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  createProtocol,
  getProtocolsByViolatorPassportNumber,
} from '../../redux/slices/protocolSlice';
import { clearProtocolsOfSpecificViolator } from '../../redux/slices/protocolSlice';
import { useSelector, useDispatch } from 'react-redux';
import { protocolValidationSchema } from '../../schemas/protocolValidationSchema';
import styles from './CreateProtocol.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { getParkOfficerById } from '../../redux/slices/parkOfficerSlice';
import cx from 'classnames';
import { Add, Cancel } from '@mui/icons-material';

const initialValues = {
  serviceNotes: '',
  fineAmount: 0,
  violatorFullName: '',
  violatorPassportNumber: '',
};

const CreateProtocol = () => {
  const navigate = useNavigate();
  const { selectedParkOfficer } = useSelector((state) => state.parkOfficers);
  const { protocolsOfSpecificViolator } = useSelector(
    (state) => state.protocols
  );
  const dispatch = useDispatch();
  const { parkOfficerID } = useParams();

  useEffect(() => {
    dispatch(clearProtocolsOfSpecificViolator());

    if (parkOfficerID) {
      dispatch(getParkOfficerById(parkOfficerID));
    }
  }, [dispatch, parkOfficerID]);

  const handleCreateProtocolSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(createProtocol({ parkOfficerID, protocolData: values }));
      navigate(`/protocols/${parkOfficerID}/`);
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const handleViolatorPassportBlur = async (e) => {
    const passportNumber = e.target.value;
    if (passportNumber) {
      await dispatch(getProtocolsByViolatorPassportNumber(passportNumber));
    }
  };

  if (!selectedParkOfficer) {
    return (
      <h1>
        Oooops! Officer not found! Please check if the officer id is correct
      </h1>
    );
  }

  return (
    <>
      <h2 className={styles['form-title']}>
        {selectedParkOfficer.fullName} | Create protocol
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={protocolValidationSchema}
        onSubmit={handleCreateProtocolSubmit}
      >
        {(formikProps) => (
          <Form className={styles['form-container']}>
            <label>
              Service notes:
              <Field name="serviceNotes" as="textarea" autoComplete="off" />
              <ErrorMessage
                name="serviceNotes"
                component="div"
                className={styles['form-error']}
              />
            </label>

            <label>
              Fine amount:
              <Field name="fineAmount" type="number" autoComplete="off" />
              <ErrorMessage
                name="fineAmount"
                component="div"
                className={styles['form-error']}
              />
            </label>

            <label>
              Violator full name:
              <Field name="violatorFullName" autoComplete="off" />
              <ErrorMessage
                name="violatorFullName"
                className={styles['form-error']}
                component="div"
              />
            </label>

            <label>
              Violator passport number:
              <Field
                name="violatorPassportNumber"
                autoComplete="off"
                onBlur={handleViolatorPassportBlur}
              />
              <ErrorMessage
                name="violatorPassportNumber"
                component="div"
                className={styles['form-error']}
              />
            </label>

            {formikProps.values.violatorPassportNumber &&
              protocolsOfSpecificViolator !== null && (
                <div
                  className={cx(styles['violator-info'], {
                    [styles['no-protocols']]:
                      protocolsOfSpecificViolator.length === 0,
                    [styles['has-protocols']]:
                      protocolsOfSpecificViolator.length > 0,
                  })}
                >
                  {protocolsOfSpecificViolator.length === 0
                    ? 'The violator has not protocols'
                    : `The violator has ${protocolsOfSpecificViolator.length} protocol(s)`}
                </div>
              )}

            <div className={styles['button-container']}>
              <button type="submit">
                <Add fontSize="small" /> Create protocol
              </button>
              <button type="button" onClick={() => navigate(-1)}>
                <Cancel fontSize="small" /> Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateProtocol;
