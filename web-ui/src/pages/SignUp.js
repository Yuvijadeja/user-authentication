import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { regexAlphaNumeric, regexContactNumber, regexEmail } from '../utils/regex';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Alert from '../components/Alert';

const initialValues = {
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  password: '',
  confirm_password: '',
};

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Email is required!"
  } else if (!values.email.match(regexEmail)) {
    errors.email = "Invalid E-Mail Addess!"
  }

  if (!values.password) {
    errors.password = "Password is required!"
  }

  if (!values.confirm_password) {
    errors.confirm_password = "Confirm password is required!"
  } else if (values.confirm_password !== values.password) {
    errors.confirm_password = "Password does not match!"
  }

  if (!values.first_name) {
    errors.first_name = "First name is required!"
  } else if (!values.first_name.match(regexAlphaNumeric)) {
    errors.first_name = "Only alpha-numeric value are allowed!"
  }

  if (!values.last_name) {
    errors.last_name = "Last name is required!"
  } else if (!values.last_name.match(regexAlphaNumeric)) {
    errors.last_name = "Only alpha-numeric values are allowed!"
  }

  if (!values.phone) {
    errors.phone = "Mobile number is required!"
  } else if (values.phone && !values.phone.match(regexContactNumber)) {
    errors.phone = "Invalid Mobile Number!"
  }

  return errors;
}

function Signup() {
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleSave = (values) => {
    console.log(values);
    setIsLoading(false);
    setAlert({ type: 'success', message: 'Account created successfully!' });
    setShowAlert(true);
    navigate('/login');
  };

  return (
    <div className="container-fluid">
      {isLoading && <Loader />}
      {showAlert && <Alert setShowAlert={setShowAlert} type={alert.type} message={alert.message} />}

      <div className="row mb-4">
        <div className="col-12">
          <h4 className="mt-3 ml-3">User Authentication</h4>
        </div>
      </div>

      <div className="row justify-content-center align-items-center">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="card p-4">
            <div className="card-body">
              <small className='text-secondary'>Let's get started for free!</small>
              <h3 className="mt-2 mb-4">Create Account</h3>
              <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={handleSave}
              >{
                  formik => (
                    <Form>
                      <div className='row mb-3'>
                        <div className='col-6'>
                          <Field
                            type="text"
                            className="form-control"
                            id="first_name"
                            name="first_name"
                            placeholder="First name"
                          />
                          <ErrorMessage name='first_name' component={Error} />
                        </div>

                        <div className='col-6'>
                          <Field
                            type="text"
                            className="form-control"
                            id="lafirst_name"
                            name="last_name"
                            placeholder="Last name"
                          />
                          <ErrorMessage name='last_name' component={Error} />
                        </div>
                      </div>

                      <div className='row mb-3'>
                        <div className='col-12'>
                          <Field
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            placeholder="Mobile number"
                          />
                          <ErrorMessage name='phone' component={Error} />
                        </div>
                      </div>

                      <div className='row mb-3'>
                        <div className='col-12'>
                          <Field
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Email address"
                          />
                          <ErrorMessage name='email' component={Error} />
                        </div>
                      </div>

                      <div className='row mb-3'>
                        <div className='col-12'>
                          <Field
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Password"
                          />
                          <ErrorMessage name='password' component={Error} />
                        </div>
                      </div>

                      <div className='row mb-3'>
                        <div className='col-12'>
                          <Field
                            type="password"
                            className="form-control"
                            id="confirm_password"
                            name="confirm_password"
                            placeholder="Confirm password"
                          />
                          <ErrorMessage name='confirm_password' component={Error} />
                        </div>
                      </div>

                      <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-primary btn-block pt-2 pb-2">Create Account</button>
                      </div>
                    </Form>
                  )
                }
              </Formik>

              <div className='text-center'>
                <small className='text-secondary'>
                  Already have an account?&nbsp;
                  <Link to="/login">Login!</Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div><br />
    </div>
  );
};

export default Signup;