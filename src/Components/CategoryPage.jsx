import React, { useEffect, useState } from 'react'
import '../style/categoryPage.css'
import Card from './Card';
import { useOutletContext, useSearchParams } from 'react-router-dom'

export default function CategoryPage() {
    const { data } = useOutletContext();
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const querySnapshot = await getDocs(collection(firestore, "data"));
    //             querySnapshot.forEach((doc) => {
    //                 console.log(`${doc.id} => ${doc.data()}`);
    //                 setData(doc.data().data)
    //             });
    //         } catch (e) {
    //             console.error("Error fetching documents: ", e);
    //         }
    //     };
    //     fetchData();
    //     return () => {
    //     };
    // }, []);

    // useEffect(() => {
    //     fetch('https://dummyjson.com/products?limit=194')
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setData(data.products);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching data:', error);
    //         });
    // }, []);


    let categoryData = data.filter((item) => {
        return item.category.toString() == category
    })

    return (
        <div className='categoryPage'>
            <div className="categoryPageBar">
                <span></span>
                <p >{category}</p>
            </div>
            <div className="categoryCardList">
                {categoryData.map((item) => (
                    <Card
                        img={item.images[0]}
                        title={item.title}
                        price={item.price}
                        discount={item.discountPercentage}
                        oldPrice={(item.price / (1 - (item.discountPercentage / 100))).toFixed(2)}
                        id={item.id}
                        key={item.id}
                        brand={item.brand}
                        category={item.category == 'smartphones' ? 'Mobiles' : item.category}
                    />
                ))}
            </div>
        </div>
    )
}
