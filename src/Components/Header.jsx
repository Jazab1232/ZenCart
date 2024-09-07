import React, { useContext } from 'react'
import '../style/header.css'
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from './config/config';
import { AppContext } from './context/Context'


export default function Header({ showNav, setShowNav, searchData, setSearchData }) {

    const { cartItem, setCartItem, loggedIn, setLoggedIn } = useContext(AppContext);

    const navigate = useNavigate()
    function handleLogOut() {
        auth.signOut()
            .then(() => {
                setLoggedIn(false)
                console.log('User signed out successfully');
                navigate('/login')
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    }
    function handleCart() {
        if (!loggedIn) {
            alert('Please Login First To create Your Cart')
        }
    }
    return (
        <div className='header'>

            <Link to='/' className="logo">
                <img src={logo} alt="" />
            </Link >
            <div className='searchLinks'>
                <div className="searchBox">
                    <input
                        type="text"
                        placeholder='Search for Product,Brands and More'
                        onChange={(e) => { setSearchData(e.target.value) }}
                        value={searchData}
                    />
                    <div><i className="fa-solid fa-magnifying-glass"></i></div>
                </div>
                <div className="navLinks">
                    <Link to={`/category?category=tops`} className='links'>Dresses</Link>
                    <Link to={`/category?category=laptops`} className='links'>Laptops</Link>
                    <Link to={`/category?category=mens-shoes`} className='links'>Shoes</Link>
                    <Link to={`/category?category=smartphones`} className='links'>Mobiles</Link>
                    <Link to={`/category?category=furniture`} className='links'>Furniture</Link>
                    <Link to={`/category?category=beauty`} className='links'>Beauty</Link>
                    <Link to={`/category?category=groceries`} className='links'>Groceries</Link>
                    <Link to={`/category?category=home-decoration`} className='links'>Home</Link>
                    <Link to={`/category?category=kitchen-accessories`} className='links'>kitchen</Link>
                </div>
            </div>
            <div className="navButtons">
                {loggedIn ? (
                    <Link to='/signUp' onClick={handleLogOut} className="headerLink authLinks">
                        <i className="fa-solid fa-arrow-right-to-bracket"></i> LogOut
                    </Link>
                ) : (
                    <Link to='/login' className="headerLink authLinks">
                        <i className="fa-solid fa-arrow-right-to-bracket"></i> Login
                    </Link>
                )}

                {!loggedIn && (
                    <Link Link to='/signUp' className="headerLink authLinks">
                        <i class="fa-solid fa-user"></i> Register
                    </Link>
                )}

                <Link to={loggedIn ? '/cart' : '/login'} onClick={handleCart} className="headerLink">
                    <i className="fa-solid fa-cart-shopping"></i>
                </Link>

                <i className="fa-solid fa-bars " onClick={() => { setShowNav(!showNav) }}></i>
            </div>
        </div >
    )
}
