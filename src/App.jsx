import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import { useEffect, useState } from 'react';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { firestore } from './Components/config.js/config';

function App() {
  const [data, setData] = useState([])

  //check Out Page Data

  const [account, setAccount] = useState()
  const [address, setAddress] = useState()
  const [mobileNum, setMobileNum] = useState()
  const [checkoutName, setCheckoutName] = useState()
  const [orderData, setOrderData] = useState()



  // Product Data Getting from Firestore
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(firestore, "data"));
  //       querySnapshot.forEach((doc) => {
  //         setData(doc.data().data)
  //         console.log(data);

  //       });
  //     } catch (e) {
  //       console.error("Error fetching documents: ", e);
  //     }
  //   };
  //   fetchData();
  //   return () => {
  //   };
  // }, []);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://dummyjson.com/products?limit=149')
      .then(response => response.json())  // Convert the response to JSON
      .then(data => {
        setData(data.products);  // Assuming the products are inside a "products" key
      })
      .catch(error => {
        console.error('Error fetching data:', error);  // Handle any errors
      });
  }, []);  //

  // if (data) {
  //   useEffect(() => {
  //     // Define an async function inside the useEffect
  //     const addDataToFirestore = async () => {
  //       try {
  //         await setDoc(doc(firestore, "data", "productData"), { data });
  //         console.log("Data successfully written!");
  //       } catch (e) {
  //         console.error("Error adding document: ", e);
  //       }
  //     };

  //     // Call the async function 
  //     addDataToFirestore();

  //     // Cleanup function (if needed, but in this case, nothing to cleanup)
  //     return () => {
  //       // Any cleanup code if necessary
  //     };
  //   }, [10000]);
  // }






  return (
    <>

      <Header />
      <Outlet context={{
        data, account, setAccount, address, setAddress, mobileNum, setMobileNum, checkoutName,
        setCheckoutName, orderData, setOrderData
      }} />
    </>
  )
}

export default App