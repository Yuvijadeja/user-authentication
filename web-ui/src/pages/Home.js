import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader.js';
import Alert from '../components/Alert.js';
import { isAuthenticated, getCookie } from '../utils/functions.js';

function Home() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [user, setUser] = useState("");

  const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate('/login');
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const token = getCookie('token');
    const apiBaseURL = process.env.REACT_APP_API_URL;

    const myHeaders = new Headers();
    myHeaders.append("x-access-token", token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`${apiBaseURL}/user`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.type === "success") {
          setUser(result.message.first_name);
        } else {
          setAlert({ type: result.type, message: result.message });
          setShowAlert(true);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setAlert({ type: "error", message: "Something went wrong!" });
        setShowAlert(true);
        setIsLoading(false);
      });
  }, []);
  
  return (
    <div className='container-fluid'>
      {isLoading && <Loader />}
      {showAlert && <Alert setShowAlert={setShowAlert} type={alert.type} message={alert.message} />}

      <div className='row'>
        <div className='col-10'>
          <h3 className='mt-3 ml-3'>Welcome {user}!</h3>
        </div>

        <div className='col-2 text-end'>
          <button className='btn btn-danger mt-3' onClick={() => logout()}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home;