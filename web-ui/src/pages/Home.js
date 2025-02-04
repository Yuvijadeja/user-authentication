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
    setUser(getCookie('token'));
    setIsLoading(false);
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