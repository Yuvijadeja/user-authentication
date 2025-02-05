import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Alert from '../components/Alert';

const initialValues = {
  email: '',
  password: ''
};

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
}

function Login() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleSave = (values) => {
    setIsLoading(true);
    const apiBaseURL = process.env.REACT_APP_API_URL;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": values.email,
      "password": values.password
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(`${apiBaseURL}/login`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.type === "success") {
          document.cookie = `token=${result.message}; path=/; max-age=3600`; // Expires in 1 hour
          navigate("/");
        } else {
          setAlert({ type: result.type, message: result.message });
          setShowAlert(true);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setAlert({ type: "error", message: "Something went wrong!" });
        setShowAlert(true);
        console.log(error);
        setIsLoading(false);
      });
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
              <small className='text-secondary'>Please enter your credentials</small>
              <h3 className="mt-2 mb-4">Welcome back</h3>
              <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={handleSave}
              >{
                  formik => (
                    <Form>
                      <div className="form-group mb-4">
                        <Field
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Email address"
                        />
                        <ErrorMessage name='email' component={Error} />
                      </div>

                      <div className="form-group mb-4">
                        <Field
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          placeholder="Password"
                        />
                        <ErrorMessage name='password' component={Error} />
                      </div>

                      <div className="d-grid mb-3">
                        <button type="submit" className="btn btn-primary btn-block pt-2 pb-2">Log in</button>
                      </div>
                    </Form>
                  )
                }
              </Formik>

              <div className='text-center'>
                <small className='text-secondary'>
                  Don't have an account yet?&nbsp;
                  <Link to="/signup">Create now!</Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;