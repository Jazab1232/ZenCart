import React, { useContext, useEffect, useState } from 'react';
import '../style/orderDetails.css';
import { AppContext } from './context/Context';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './config.js/config';

export default function OrderDetails() {
  const { cartItem, currentUser } = useContext(AppContext);
  const [orderData, setOrderData] = useState([]);

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

  // Filter orderData based on currentUser.uid
  const currentUserOrders = orderData.filter((item) => item.userId === currentUser.uid);
  console.log(currentUserOrders);

  return (
    <div className='orderDetails'>
      {currentUserOrders.length > 0 ? (
        currentUserOrders.map((item, index) => (
          <div key={index} className="orderDetailsBox">
            <h2>Order Details</h2>
            <p className="orderName">
              <span> Name:</span> {item.checkoutName}
            </p>
            <p className="orderAccount">
              <span>Bank Account :</span>  {item.account}
            </p>
            <p className="orderAddress">
              <span>Address: </span>{item.address}
            </p>
            <p className="orderMobile">
              <span>Mobile :</span> {item.mobileNum}
            </p>
            <p className='orderItems'>
              <span>No of Items:</span> {cartItem.length}
            </p>
            <p>Your Order will be delivered within 7 Days</p>

          </div>
        ))
      ) : (
        <div className="noOrders">No orders found</div>
      )}
    </div>
  );
}
