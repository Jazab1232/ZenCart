import React, { useContext, useEffect, useState } from 'react'
import '../style/login.css'
import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from './config.js/config';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from './context/Context';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { cartItem, setCartItem, loggedIn, setLoggedIn } = useContext(AppContext);
  console.log(email, password);
  const navigate = useNavigate()
  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoggedIn(true)
        // console.log('User Successfully logged in', user);
        alert('Logged In succesfully')
        navigate('/')

      })
      .catch((error) => {
        console.error(error)
        alert('invalid User Name or Password')
      });

  }

  const provider = new GoogleAuthProvider();
  function signUpwithGoogle() {
    signInWithPopup(auth, provider)
    setLoggedIn(true)
    alert('logged in succesfully')
    navigate('/')
  }

  return (

    <div className='login'>
      <div className="loginBox">
        <h2>Login to your Account</h2>

        <div className='loginEmail'>
          <p>Email Address:</p>
          <input type="text"
            placeholder='Enter your Email'
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />
        </div>
        <div className='loginPassword'>
          <p>Password:</p>
          <input type="password"
            placeholder='Enter your Password'
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />
        </div>
        <button className='loginButton' onClick={handleLogin}>Login</button>
        <p>OR</p>
        <button className='googleButton' onClick={signUpwithGoogle}><i className="fa-brands fa-google"></i>login with Google</button>
        <Link to='/signUp' className='loginLink'>Create New Account</Link>

      </div>
    </div>

  )
}
