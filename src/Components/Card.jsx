import React from 'react'
import '../style/card.css'
import { Link } from 'react-router-dom'

export default function Card({ img, title, price, id, category, discount, oldPrice, brand }) {

    let categoryTag;

    // Conditional logic
    if (category === 'home-decoration') {
        categoryTag = 'Home';
    } else if (category === 'kitchen-accessories') {
        categoryTag = 'Kitchen';
    } else if (category === 'smartphones') {
        categoryTag = 'Mobiles';
    } else if (category === 'mens-shoes' || category === 'womens-shoes') {
        categoryTag = 'Shoes';
    } else {
        categoryTag = category;
    }
    return (
        <Link to={`/details?id=${id}`} className='card'  >
            <div className="cardImg">
                <img src={img} alt="" />
            </div>
            <div className="cardContent">
                <p className='brand'><span>Brand:</span> {brand ? brand : 'No Brand'}</p>
                <p className='cardTitle'>{title}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <div className="oldPrice"><span>${oldPrice}</span></div>
                    <p className='price'>${price}</p>
                    <div className="discount"> {discount}% off</div>
                </div>
            </div>
            <span className='cardTag'>{categoryTag}</span>
            
        </Link>
    )
}
