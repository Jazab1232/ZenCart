import React, { useContext, useEffect, useState } from 'react';
import '../style/orderDetails.css';
import { AppContext } from './context/Context';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { firestore } from './config/config';
import SideNav from './SideNav';

export default function OrderDetails() {
  const { cartItem, currentUser } = useContext(AppContext);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        const orderDocRef = doc(firestore, "orderDetails", 'orderDetails');
        const docSnapshot = await getDoc(orderDocRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data().orders || [];
          console.log('Retrieved order data: ', data);
          setOrderData(data);
        } else {
          console.log("No such document!");
          setOrderData([]);
        }
      } catch (error) {
        console.error("Error fetching order details: ", error);
      }
    }

    fetchOrderDetails();

    return () => {
    };

  }, [])


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
              <span>No of Items:</span> {item.cartItem ? item.cartItem.length : item.Quantity || 'N/A'}
            </p>
            <p>Your Order will be delivered within 7 Days</p>

          </div>
        ))
      ) : (
        <div className="noOrders">No orders found</div>
      )}

      <SideNav />
    </div>
  );
}
