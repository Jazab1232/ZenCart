import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './Components/Header'
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { firestore } from './Components/config/config';
import Footer from './Components/Footer';

function App() {
  const [data, setData] = useState([])

  const [showNav, setShowNav] = useState(false)

  const [searchData, setSearchData] = useState('')
  console.log(searchData);

  //check Out Page Data

  const [account, setAccount] = useState()
  const [address, setAddress] = useState()
  const [mobileNum, setMobileNum] = useState()
  const [checkoutName, setCheckoutName] = useState()
  const [orderData, setOrderData] = useState()



  // useEffect(() => {
  //   // Fetch data from the API
  //   fetch('https://dummyjson.com/products?limit=194')
  //     .then(response => response.json())  // Convert the response to JSON
  //     .then(data => {
  //       setData(data.products);  // Assuming the products are inside a "products" key
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);  // Handle any errors
  //     });
  // }, []);  
  
  // useEffect(() => {
  //   // Fetch data from the API
  //   fetch('https://dummyjson.com/products?limit=194')
  //     .then(response => response.json())
  //     .then(data => {
  //       setData(data.products);
        
  //       // Set data to Firestore
  //       const setDataToFirestore = async () => {
  //         try {
  //           const docRef = doc(firestore, 'products', 'productData'); // Define your document path
  //           await setDoc(docRef, { products: data.products });
  //           console.log('Data successfully written to Firestore!');
  //         } catch (error) {
  //           console.error('Error writing document to Firestore:', error);
  //         }
  //       };

  //       setDataToFirestore();
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  const fetchDataFromFirestore = async () => {
    try {
      const docRef = doc(firestore, 'products', 'productData'); // Define your document path
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        setData(docSnap.data().products);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching document from Firestore:', error);
    }
  };

  useEffect(() => {
    fetchDataFromFirestore();
  }, []);

  
 

  return (
    <>

      <Header
        showNav={showNav}
        setShowNav={setShowNav}
        searchData={searchData}
        setSearchData={setSearchData}
      />
      <Outlet context={{
        data, account, setAccount, address, setAddress, mobileNum, setMobileNum, checkoutName,
        setCheckoutName, orderData, setOrderData, showNav, setShowNav, searchData
      }} />
      <Footer />
    </>
  )
}

export default App