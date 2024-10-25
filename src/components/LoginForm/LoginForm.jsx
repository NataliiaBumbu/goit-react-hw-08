import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { CiLogin } from 'react-icons/ci';
import { useId } from 'react';

import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';

import styles from './LoginForm.module.css';

// Оновлена схема валідації для пароля з мінімумом 6 символів
const RegistrationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required field!'),
  password: Yup.string()
    .min(7, 'Password must be at least 6 characters long')  // Мінімум 6 символів
    .required('Password is required field!'),
});

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(login(values));
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={RegistrationSchema}
    >
      {({ isSubmitting }) => (
        <Form className={styles.formContact}>
          <label className={styles.formLabel} htmlFor={emailFieldId}>
            Email
          </label>
          <div className={styles.formInputWrapper}>
            <Field
              className={styles.formInput}
              type='email'
              inputMode='email'
              name='email'
              id={emailFieldId}
            />
            <ErrorMessage
              className={styles.formErrorMessage}
              name='email'
              component='div'
            />
          </div>

          <label className={styles.formLabel} htmlFor={passwordFieldId}>
            Password
          </label>
          <div className={styles.formInputWrapper}>
            <Field
              className={styles.formInput}
              type='password'
              inputMode='text'
              name='password'
              id={passwordFieldId}
            />
            <ErrorMessage
              className={styles.formErrorMessage}
              name='password'
              component='div'
            />
          </div>

          <button
            className={styles.formButton}
            type='submit'
            disabled={isSubmitting}
          >
            <CiLogin /> <span>LogIn</span>
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
