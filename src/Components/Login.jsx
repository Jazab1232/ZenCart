import React, { useContext, useEffect, useState } from 'react';
import '../style/login.css';
import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from './config/config';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from './context/Context';
import SideNav from './SideNav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        setLoggedIn(true);
        toast("Welcome back!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "authToast",
          progressClassName: "customProgressBar",
        });
        navigate('/');
      } else {
        // User is logged out
        setLoggedIn(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [setLoggedIn, navigate]);

  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoggedIn(true);

        // Show success toast and navigate only after toast is closed
        toast("Logged in successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "authToast",
          progressClassName: "customProgressBar",
          onClose: () => {
            navigate('/');
          },
        });
      })
      .catch((error) => {
        console.error(error);
        toast("Invalid email or Password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "errorToast",
          progressClassName: "customProgressBar",
        });
      });
  }

  const provider = new GoogleAuthProvider();
  function signUpwithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        setLoggedIn(true);
        toast("Logged in successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "authToast",
          progressClassName: "customProgressBar",
          onClose: () => {
            navigate('/');
          },
        });
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
        toast("Failed to log in. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "errorToast",
          progressClassName: "customProgressBar",
        });
      });
  }

  return (
    <div className='login'>
      <div className="loginBox">
        <h2>Login to your Account</h2>

        <div className='loginEmail'>
          <p>Email Address:</p>
          <input
            type="text"
            placeholder='Enter your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='loginPassword'>
          <p>Password:</p>
          <input
            type="password"
            placeholder='Enter your Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='loginButton' onClick={handleLogin}>Login</button>
        <p>OR</p>
        <button className='googleButton' onClick={signUpwithGoogle}>
          <i className="fa-brands fa-google"></i>Login with Google
        </button>
        <Link to='/signUp' className='loginLink'>Create New Account</Link>
      </div>

      <SideNav />
      <ToastContainer />
    </div>
  );
}
