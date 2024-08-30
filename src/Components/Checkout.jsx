import React, { useContext, useEffect, useState } from 'react'
import '../style/checkout.css'
import { Link, useOutletContext } from 'react-router-dom';
import { AppContext } from './context/Context';
import { arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from './config.js/config';
export default function Checkout() {

    const { account, setAccount, address, setAddress, mobileNum, setMobileNum,
        checkoutName, setCheckoutName,orderData, setOrderData } = useOutletContext();
    const { cartItem, currentUser } = useContext(AppContext);
    const [showDetailBtn,setShowDetailBtn]= useState(false)


    // console.log(currentUser.uid);
    
    let totalPrice = 0
    let userCartDetails = cartItem.filter((item) => {
        return item.userId = currentUser.uid
    })
    userCartDetails.map((item) => {
        let itemTotal = item.quantity * item.price
        return totalPrice += itemTotal
    })

    let orderDetails = {
        orderId: crypto.randomUUID(),
        account,
        address,
        mobileNum,
        checkoutName,
        cartItem,
        // userId: currentUser.uid,
        OrderDate: new Date(),
        totalPrice,

    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, "orderDetails"));
                const data = [];
                querySnapshot.forEach((doc) => {

                    const docData = doc.data();
                    if (docData.orders) {
                        data.push(...docData.orders);
                    }
                    console.log('Fetched data:', docData);
                });
                setOrderData(data);
            } catch (e) {
                console.error('Error fetching documents: ', e);
            }
        };
        fetchData();
    }, []);

    // Save OrderDetails to Firestore whenever it changes
    function handleCheckOut() {
        if (account && address && mobileNum && checkoutName) {
            const saveData = async () => {
                try {
                    if (!currentUser) return;

                    const orderDetailsRef = doc(firestore, 'orderDetails', currentUser.uid);

                    const docSnap = await getDoc(orderDetailsRef);

                    if (docSnap.exists()) {
                        await updateDoc(orderDetailsRef, {
                            orders: arrayUnion(orderDetails),
                        });
                    } else {
                        await setDoc(orderDetailsRef, {
                            orders: [{...orderDetails,userId:currentUser.uid}],
                        });
                    }

                    // console.log('Order Details added successfully');
                    alert('Order Placed succesfully')
                    setShowDetailBtn(true)
                } catch (e) {
                    console.error('Error saving order data', e);
                    alert(e)
                }
            };

            if (cartItem.length > 0) {
                saveData();
            }
        }
    }


    return (
        <div className='checkout'>
            <div className="BankingInfo">
                <h3>Enter Payment Details</h3>
                <p>Account Number:</p>
                <input type="text"
                    placeholder='Enter Account Number'
                    value={account}
                    onChange={(e) => { setAccount(e.target.value) }}
                />
                <p>Mobile Number:</p>
                <input type="text"
                    placeholder='Mobile Number'
                    value={mobileNum}
                    onChange={(e) => { setMobileNum(e.target.value) }}
                />
                <p>Address:</p>
                <input type="text"
                    placeholder='Enter Home Address'
                    value={address}
                    onChange={(e) => { setAddress(e.target.value) }}
                />
                <p>Your Name:</p>
                <input type="text"
                    placeholder='Enter Your Name'
                    value={checkoutName}
                    onChange={(e) => { setCheckoutName(e.target.value) }}
                />
                <button className="orderBtn" onClick={handleCheckOut}>Order Now</button>
            </div>
            <div className="BuyItemsDetails">
                <p>Total Amount : {totalPrice}</p>
                <p>Total Items : {cartItem.length}</p>
            </div>
            <Link to= '/orderDetails' className="orderBtn"  style={{display:showDetailBtn? 'inline-block':'none' }}>View Order Details</Link>
        </div>
    )
}
