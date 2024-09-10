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
