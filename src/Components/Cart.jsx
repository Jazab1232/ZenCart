import React, { useContext, useEffect } from 'react'
import '../style/cart.css'
import { AppContext } from './context/Context';
import { Link } from 'react-router-dom';
import SideNav from './SideNav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cart() {

    const { cartItem, setCartItem, currentUser } = useContext(AppContext);

    let SerialNum = 0
    let totalPrice = 0

    function increaseQuantity(id) {
        console.log("Increasing quantity for item id:", id);
        setCartItem((prevItems) => {
            console.log("Previous items:", prevItems);
            const updatedItems = prevItems.map((item) => {
                if (item.id === id) {
                    console.log(`Updating item ${id}:`, item);
                    return { ...item, quantity: (item.quantity || 0) + 1 };
                }
                return item;
            });
            console.log("Updated items:", updatedItems);
            return updatedItems;
        });
    }

    function decreaseQuantity(id) {
        console.log("Decreasing quantity for item id:", id);
        setCartItem((prevItems) => {
            const updatedItems = prevItems.map((item) => {
                if (item.id === id) {
                    console.log(`Updating item ${id}:`, item);
                    // Ensure quantity does not go below 1
                    const newQuantity = Math.max((item.quantity || 1) - 1, 1);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            console.log("Updated items:", updatedItems);
            return updatedItems;
        });
    }

    function removeItem(id) {
        // console.log("Removing item with id:", id);
        toast("Item deleted from cart", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "delCartToast",
            progressClassName: "customProgressBar",
        });
        setCartItem((prevItems) => {
            const updatedItems = prevItems.filter((item) => item.id !== id);
            return updatedItems;
        });

    }
    const currentUserCart = cartItem.filter((item) => {
        return item.userId == currentUser.uid
    })
    currentUserCart.map((item) => {
        let itemTotal = item.quantity * item.price
        return totalPrice += itemTotal
    })
    console.log(currentUser);



    return (
        <div className='cart'>
            <div className="cardHead">
                <p className='cartSerial'>S.N.</p>
                <p className='cartProductTitle'>Product</p>
                <p>Unit Price</p>
                <p>Quantity</p>
                <p>Total Price</p>
                <p>Action</p>
            </div>
            {currentUserCart.map((item) => {

                return <div className="cartList">
                    <p className='cartSerial'>{++SerialNum}</p>
                    <div className='cartProduct'><img src={item.thumbnail} alt="" /><p>{item.title}</p></div>
                    <p>${item.price}</p>
                    <p className='Cartquantity'>
                        <span style={{ cursor: 'pointer' }}
                            onClick={() => decreaseQuantity(item.id)}
                        >-</span>
                        <span>{item.quantity}</span>
                        <span style={{ cursor: 'pointer' }}
                            onClick={() => increaseQuantity(item.id)}
                        >+</span>
                    </p>
                    <p className='totalPrice'>${((item.price) * (item.quantity)).toFixed(2)}</p>
                    <p style={{ cursor: 'pointer' }}
                        onClick={() => removeItem(item.id)} >Remove</p>
                </div>
            })}
            <div className="totalCartPrice">
                <div className="clearBtn">
                    <button><i class="fa-solid fa-trash"></i> Clear Cart</button>
                </div>
                <div className="priceAndCheckOut">
                    <p>Total ({SerialNum} items):  <span> ${totalPrice.toFixed(2)}</span></p>
                    <Link to='/checkout' className='checkOutbtn'>Check Out</Link>
                </div>
            </div>
            <div style={{marginTop:'40px'}}>
                <Link to='/orderDetails' className='OrderDetailBtn '>Order Details</Link>
            </div>
            <SideNav />
            <ToastContainer />
        </div>
    )
}
