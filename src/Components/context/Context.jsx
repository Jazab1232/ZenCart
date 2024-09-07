import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { auth, firestore } from '../config/config';
import { useOutletContext } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

// Create the context
export const AppContext = createContext();

// Create the provider component
export function AppProvider({ children }) {
    const [cartItem, setCartItem] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setLoggedIn(true);
            setCurrentUser(user);
          } else {
            setLoggedIn(false);
            setCurrentUser(null);
          }
        });
    
        return () => unsubscribe(); // Cleanup subscription
      }, []);
    

    useEffect(() => {
        if (currentUser) {
            const fetchData = async () => {
                try {
                    const docRef = doc(firestore, 'cartItem', currentUser.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setCartItem(docSnap.data().cartItem || []);
                    }
                } catch (e) {
                    console.error('Error fetching documents: ', e);
                }
            };

            fetchData();
        }
    }, [currentUser]);
    

    useEffect(() => {
        const saveData = async () => {
            try {
                if (currentUser) {
                    await setDoc(doc(firestore, 'cartItem', currentUser.uid), { cartItem });
                    console.log('Cart data added successfully');
                }
            } catch (e) {
                console.error('Error sending data', e);
            }
        };

        if (cartItem.length > 0 && currentUser) {
            saveData();
        }
    }, [cartItem, currentUser]);
    

    return (
        <AppContext.Provider value={{ cartItem, setCartItem, loggedIn, setLoggedIn, currentUser, setCurrentUser }}>
            {children}
        </AppContext.Provider>
    );
}









































// import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
// import React, { createContext, useEffect, useState } from 'react';
// import { auth, firestore } from '../config.js/config';
// import { useOutletContext } from 'react-router-dom';

// // Create the context
// export const AppContext = createContext();

// // Create the provider component
// export function AppProvider({ children }) {
//     const [cartItem, setCartItem] = useState([]);
//     const [loggedIn, setLoggedIn] = useState(true);
//     const [currentUser, setCurrentUser] = useState(null);
//     console.log(cartItem);


//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged((user) => {
//             if (user) {
//                 setCurrentUser(user);
//                 console.log('current User', currentUser);

//             } else {
//                 setCurrentUser(null);
//             }
//         });

//         return () => unsubscribe();
//     }, []);

//     if (currentUser) {
//         console.log('current User ID:', currentUser.uid);
//     }
//     console.log('LoggedIn', loggedIn);

//     useEffect(() => {
//         if (loggedIn) {
//             const fetchData = async () => {
//                 try {
//                     const querySnapshot = await getDocs(collection(firestore, 'cartItem'));
//                     const cartData = [];
//                     querySnapshot.forEach((doc) => {
//                         cartData.push(...doc.data().cartItem);
//                     });
//                     setCartItem(cartData);
//                 } catch (e) {
//                     console.error('Error fetching documents: ', e);
//                 }
//             };
//             fetchData();

//         }
//     }, []);

//     // Save cartItem to Firestore whenever it changes

//     useEffect(() => {
//         const saveData = async () => {
//             try {
//                 // Save cartItem directly
//                 await setDoc(doc(firestore, 'cartItem', currentUser.uid), { cartItem });
//                 console.log('Cart data added successfully');
//             } catch (e) {
//                 console.error('Error sending data', e);
//             }
//         };

//         if (cartItem.length > 0) {
//             saveData();
//         }
//     }, [cartItem]);

//     return (
//         <AppContext.Provider value={{ cartItem, setCartItem, loggedIn, setLoggedIn, currentUser, setCurrentUser }}>
//             {children}
//         </AppContext.Provider>
//     );
// }
