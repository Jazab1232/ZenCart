import React, { useContext, useEffect, useState } from 'react';
import '../style/details.css'
import { Link, useOutletContext } from 'react-router-dom'
import { AppContext } from './context/Context';
import SideNav from './SideNav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Details() {
    let [productQty, setProductQty] = useState(1)

    const { data } = useOutletContext();
    const { setCartItem, loggedIn, setLoggedIn, currentUser, } = useContext(AppContext);

    const query = new URLSearchParams(location.search);
    const id = query.get('id');



    const filterData = data.filter((item) => item.id == id);
    const finalArray = filterData.length > 0 ? filterData[0] : null;


    if (!finalArray) {
        return <p>Loading...</p>;
    }

    const newPrice = finalArray.price;
    const discountPercentage = finalArray.discountPercentage;
    const oldPrice = newPrice / (1 - (discountPercentage / 100))


    function addToCart() {
        if (currentUser) {
            setCartItem((prevCartItem) => {
                const checkItem = prevCartItem.find((item) => item.id === finalArray.id && item.userId == currentUser.uid);
                if (!checkItem) {
                    toast("Item added to Cart successfully", {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        className: "adToCartToast",   // Custom toast class
                        progressClassName: "customProgressBar",
                    });
                    return [...prevCartItem, { ...finalArray, quantity: productQty, userId: currentUser.uid }];
                } else {
                    toast("Item added to Cart successfully", {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        className: "adToCartToast",   // Custom toast class
                        progressClassName: "customProgressBar",
                    });
                    return prevCartItem.map((item) =>
                        item.id === checkItem.id && item.userId == currentUser.uid
                            ? { ...item, quantity: item.quantity + productQty, userId: currentUser.uid }
                            : item
                    );

                }
            });

        } else {
            alert('Please Login First To create Your Cart')
        }

    }



    return (

        <div className='details'>
            <div className="detailBox">
                <div className="detailImg">
                    <img src={finalArray.thumbnail} alt={finalArray.title} />
                    <div className='imgOption'>
                        <span><img src={finalArray.images[0]} alt="" /></span>
                        <span><img src={finalArray.images[1]} alt="" /></span>
                        <span><img src={finalArray.images[2]} alt="" /></span>
                    </div>

                </div>
                <div className="cardContent">
                    <p className='title'>{finalArray.title}</p>
                    <div className="ratings">
                        <p><span>Rating:</span>{finalArray.rating} </p>
                        <p><span>Brand:</span> {finalArray.brand ? finalArray.brand : 'No Brand'}</p>
                        <p><span>Category:</span> {finalArray.category}</p>
                    </div>
                    <div className="priceBox">
                        <div className="oldPrice">
                            <p>${oldPrice.toFixed(2)}</p>
                            <span style={{ textDecoration: 'none' }}>(Inclusive of all Taxes)</span>
                        </div>
                        <div className="newPrice"><p>${finalArray.price}</p> <span>{finalArray.discountPercentage}% OFF</span></div>
                    </div>
                    <div className="quantityBox">
                        <p>Quantity: </p>
                        <div>
                            <span onClick={() => { if (productQty > 1) { setProductQty(productQty - 1) } }}>-</span>
                            <span className='quantity'>{productQty}</span>
                            <span onClick={() => { setProductQty(productQty + 1) }}>+</span>
                        </div>
                    </div>
                    <div className="detailButtons">
                        <Link className='btnAddToCart' onClick={addToCart}><i className="fa-solid fa-cart-shopping"></i>Add To Cart</Link>
                        <Link to={`/checkout?id=${finalArray.id}&quantity=${productQty}`} className='btnBuyNow'  >Buy Now</Link>
                    </div>

                </div>


            </div>
            <div className="descBox">
                <h2>Description</h2>
                <p>{finalArray.description}</p>
            </div>
            <div className="reviewsAndRating">
                <h3>Reviews And Ratings</h3>
                <div className="reviewsBox">
                    {finalArray.reviews.map((review) => {
                        return <div className='review'>
                            <p className='reviewDate'>{review.date}</p>
                            <p className='reviewName'>{review.reviewerName}</p>
                            <p className='reviewComment' >{review.comment}</p>
                        </div>
                    })}

                </div>
            </div>

            <SideNav />
            <ToastContainer />
        </div>
    );
}
