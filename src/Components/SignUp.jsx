import React, { useContext, useState } from 'react'
import '../style/signUp.css'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from './config/config';
import { AppContext } from './context/Context';
import SideNav from './SideNav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { cartItem, setCartItem, loggedIn, setLoggedIn } = useContext(AppContext);
    console.log(email, password);
    const navigate = useNavigate()

    function handlesignUp() {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setLoggedIn(true)
                // ...
                console.log('User successfully signup', user);
                toast("Account created successfully", {
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
                alert(error)

            });
    }

    const provider = new GoogleAuthProvider();
    function signUpwithGoogle() {
        signInWithPopup(auth, provider)
            .then((result) => {
                setLoggedIn(true);
                toast("SignUp successfully", {
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
                console.error('Error during sign-up:', error);
                toast("Failed to sign up. Please try again.", {
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
        <div className='signUp'>
            <div className="signUpBox">
                <h2>Create your Account</h2>

                <div className='signUpEmail'>
                    <p>Email Address:</p>
                    <input type="text"
                        placeholder='Enter your Email'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                </div>
                <div className='signUpPassword'>
                    <p>Password:</p>
                    <input type="password"
                        placeholder='Enter your Password'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                </div>
                <button className='signUpButton' onClick={handlesignUp}>Sign Up</button>
                <p>OR</p>
                <button className='googleButton' onClick={signUpwithGoogle}><i className="fa-brands fa-google"></i>SignUp with Google</button>
                <Link to='/login' className='signUpLink'>Already have account? Login</Link>

            </div>

            <SideNav />
            <ToastContainer />
        </div>
    )
}
