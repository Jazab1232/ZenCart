import React, { useContext, useEffect, useState } from 'react'
import '../style/checkout.css'
import { Link, useOutletContext } from 'react-router-dom';
import { AppContext } from './context/Context';
import { arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from './config/config';
import SideNav from './SideNav';
export default function Checkout() {

    const { account, setAccount, address, setAddress, mobileNum, setMobileNum,
        checkoutName, setCheckoutName, orderData, setOrderData } = useOutletContext();
    const { cartItem, currentUser } = useContext(AppContext);
    const [showDetailBtn, setShowDetailBtn] = useState(false)
    const { data } = useOutletContext()

    //////////////////////////////////////////////////////////////

    let productId;
    let productPrice;

    try {
        const query = new URLSearchParams(location.search);
        const id = query.get('id');
        const quantity = query.get('quantity');
        // console.log(id, quantity);
        productId = id

        let filterData = data.filter((item) => item.id == id);
        let signleProductPrice = filterData[0].price * quantity
        productPrice = signleProductPrice
        // console.log(signleProductPrice);
    } catch (error) {
        // console.log(error);
    }

    // const finalArray = filterData.length > 0 ? filterData[0] : null;


    console.log(productId);

    let totalPrice = 0
    let userCartDetails = cartItem.filter((item) => {
        return item.userId = currentUser.uid
    })
    userCartDetails.map((item) => {
        let itemTotal = item.quantity * item.price
        return totalPrice += itemTotal
    })
    let userId = currentUser.uid

    let orderDetails = {
        orderId: crypto.randomUUID(),
        account,
        address,
        mobileNum,
        checkoutName,
        cartItem,
        productId,
        productPrice,
        userId: userId,
        OrderDate: new Date(),
    }
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const querySnapshot = await getDocs(collection(firestore, "orderDetails"));
    //             const data = [];
    //             querySnapshot.forEach((doc) => {

    //                 const docData = doc.data();
    //                 if (docData.orders) {
    //                     data.push(...docData.orders);
    //                 }
    //                 console.log('Fetched data:', docData);
    //             });
    //             setOrderData(data);
    //         } catch (e) {
    //             console.error('Error fetching documents: ', e);
    //         }
    //     };
    //     fetchData();
    // }, []);

    console.log('order Data', orderData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, "orderDetails"));
                querySnapshot.forEach((doc) => {
                    let data = []
                    data.push(doc.data())
                    console.log(data);
                    setOrderData(data)

                });
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        };
        fetchData();

        return () => {
        };
    }, []);

    // Save OrderDetails to Firestore whenever it changes
    // function handleCheckOut() {
    //     if (account && address && mobileNum && checkoutName) {
    //         const saveData = async () => {
    //             try {
    //                 if (!currentUser) return;

    //                 const orderDetailsRef = doc(firestore, 'orderDetails', currentUser.uid);

    //                 const docSnap = await getDoc(orderDetailsRef);

    //                 if (docSnap.exists()) {
    //                     await updateDoc(orderDetailsRef, {
    //                         orders: arrayUnion(orderDetails),
    //                     });
    //                 } else {
    //                     await setDoc(orderDetailsRef, {
    //                         orders: [{ ...orderDetails, userId: currentUser.uid }],
    //                     });
    //                 }

    //                 // console.log('Order Details added successfully');
    //                 alert('Order Placed succesfully')
    //                 setShowDetailBtn(true)
    //                 setAccount('')
    //                 setAddress('')
    //                 setCheckoutName('')
    //                 setMobileNum('')
    //             } catch (e) {
    //                 console.error('Error saving order data', e);
    //                 alert(e)
    //             }
    //         };

    //         if (cartItem.length > 0) {
    //             saveData();
    //         }
    //     }
    // }


    async function handleCheckOut() {
        if (account && mobileNum && address && checkoutName) {
            const orderDetails = {
                orderId: crypto.randomUUID(),
                account,
                address,
                mobileNum,
                checkoutName,
                cartItem,
                userId: userId,
                OrderDate: new Date(),
                totalPrice,
                // Add any other details you want to store in orderDetails
            };

            try {
                const orderDocRef = doc(firestore, "orderDetails", 'orderDetails');

                // Create or update the document with arrayUnion
                await setDoc(orderDocRef, {
                    orders: arrayUnion(orderDetails)
                }, { merge: true });

                console.log('Order added successfully');
            } catch (error) {
                console.error("Error adding order: ", error);
            }
        } else {
            console.log("Please fill in all the required fields.");
        }
    }


    async function singleCheckOut() {

        if (account && mobileNum && address && checkoutName) {
            const orderDetails = {
                orderId: crypto.randomUUID(),
                account,
                address,
                mobileNum,
                checkoutName,
                userId: userId,
                productId,
                Quantity: 1,
                OrderDate: new Date(),
                productPrice,
                // Add any other details you want to store in orderDetails
            };

            try {
                const orderDocRef = doc(firestore, "orderDetails", 'orderDetails');

                // Create or update the document with arrayUnion
                await setDoc(orderDocRef, {
                    orders: arrayUnion(orderDetails)
                }, { merge: true });

                console.log('Order added successfully');
            } catch (error) {
                console.error("Error adding order: ", error);
            }
        } else {
            console.log("Please fill in all the required fields.");
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
                {productId
                    ?
                    <button className="orderBtn" onClick={singleCheckOut}>Order Single Now</button>
                    :
                    <button className="orderBtn" onClick={handleCheckOut}>Order  Now</button>
                }
            </div>
            <div className="BuyItemsDetails">
                <p>Total Amount : ${productId ? productPrice : totalPrice}</p>
                <p>Total Items : {productId ? 1 : cartItem.length}</p>
            </div>
            <Link to='/orderDetails' className="orderBtn" style={{ display: showDetailBtn ? 'inline-block' : 'none' }}>View Order Details</Link>

            <SideNav />
        </div>
    )
}
