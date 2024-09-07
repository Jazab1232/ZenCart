import React, { useContext } from 'react'
import '../style/sideNav.css'
import logo from '../assets/sideLogo.png'
import { Link, useOutletContext } from 'react-router-dom'
import { AppContext } from './context/Context';


export default function SideNav() {

    const { cartItem, setCartItem, loggedIn, setLoggedIn } = useContext(AppContext);
    const { showNav, setShowNav } = useOutletContext();
    return (
        <div className='sideNavbar' style={{ display: showNav ? 'block' : 'none' }}>
            <div className="sideNav">

                <div className="sideNavLogo">
                    <img src={logo} alt="" />
                    <i class="fa-regular fa-circle-xmark" onClick={() => { setShowNav(false) }}></i>
                </div>
                <div className="sideLinks">
                    <Link to={`/category?category=tops`} onClick={() => { setShowNav(false) }} className='sideLink'>Dresses</Link>
                    <Link to={`/category?category=laptops`} onClick={() => { setShowNav(false) }} className='sideLink'>Laptops</Link>
                    <Link to={`/category?category=mens-shoes`} onClick={() => { setShowNav(false) }} className='sideLink'>Shoes</Link>
                    <Link to={`/category?category=smartphones`} onClick={() => { setShowNav(false) }} className='sideLink'>Mobiles</Link>
                    <Link to={`/category?category=furniture`} onClick={() => { setShowNav(false) }} className='sideLink'>Furniture</Link>
                    <Link to={`/category?category=beauty`} onClick={() => { setShowNav(false) }} className='sideLink'>Beauty</Link>
                    <Link to={`/category?category=groceries`} onClick={() => { setShowNav(false) }} className='sideLink'>Groceries</Link>
                    <Link to={`/category?category=home-decoration`} onClick={() => { setShowNav(false) }} className='sideLink'>Home</Link>
                    <Link to={`/category?category=kitchen-accessories`} onClick={() => { setShowNav(false) }} className='sideLink'>kitchen</Link>
                </div>
                <div className="SideAuthLinks">
                    {loggedIn ? (
                        <Link to='/signUp' className="sideAuthLink ">
                            <i className="fa-solid fa-arrow-right-to-bracket"></i> LogOut
                        </Link>
                    ) : (
                        <Link to='/login' className="sideAuthLink ">
                            <i className="fa-solid fa-arrow-right-to-bracket"></i> Login
                        </Link>
                    )}

                    {!loggedIn && (
                        <Link Link to='/signUp' className="sideAuthLink ">
                            <i class="fa-solid fa-user"></i> Register
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}
