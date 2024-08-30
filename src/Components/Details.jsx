import React, { useContext, useEffect, useState } from 'react';
import '../style/details.css'
import { Link, useOutletContext } from 'react-router-dom'
import { AppContext } from './context/Context';


export default function Details() {
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


    console.log(currentUser.uid);


    function addToCart() {
        if (currentUser) {
            setCartItem((prevCartItem) => {
                const checkItem = prevCartItem.find((item) => item.id === finalArray.id && item.userId == currentUser.uid);
                if (!checkItem) {
                    return [...prevCartItem, { ...finalArray, quantity: 1, userId: currentUser.uid }];
                } else {
                    return prevCartItem.map((item) =>
                        item.id === checkItem.id && item.userId == currentUser.uid
                            ? { ...item, quantity: item.quantity + 1, userId: currentUser.uid }
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
                            <span>-</span>
                            <span className='quantity'>1</span>
                            <span>+</span>
                        </div>
                    </div>
                    <div className="detailButtons">
                        <Link className='btnAddToCart' onClick={addToCart}><i className="fa-solid fa-cart-shopping"></i>Add To Cart</Link>
                        <Link className='btnBuyNow'>But Now</Link>
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
        </div>
    );
}
