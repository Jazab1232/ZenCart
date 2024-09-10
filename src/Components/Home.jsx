import React from 'react'
import '../style/home.css'
import Card from './Card'
import { useOutletContext } from 'react-router-dom';
import SideNav from './SideNav';

export default function Home() {
  const { data, searchData } = useOutletContext();



  let searchDataFilter = data.filter((item) => {
    return item.category == searchData ||
      item.title.toLowerCase().includes(searchData?.toLowerCase()) ||
      (item.brand?.toLowerCase()) == (searchData?.toLowerCase())
  })
  // console.log(searchFilter);

  let LaptopData = searchDataFilter.filter((item) => {
    return item.category == 'laptops'
  })
  console.log(LaptopData);

  let mobileArray = searchDataFilter.filter((item) => {
    return item.category == "smartphones"
  })
  let mobileData = mobileArray.slice(0, 5);

  let furnitureData = searchDataFilter.filter((item) => {
    return item.category == 'furniture'
  })
  let dressesData = searchDataFilter.filter((item) => {
    return item.category == 'tops'
  })

  let cosmeticsData = searchDataFilter.filter((item) => {
    return item.category == "beauty"
  })



  return (
    <div className='home'>
      <div className="cardBox">
        {LaptopData.length != 0 && (
          <div className="categoryBar">
            <span></span>
            <p >Laptop</p>
          </div>)}
        <div className="cardList">
          {LaptopData.map((item) => (
            <Card
              img={item.images[0]}
              title={item.title}
              price={item.price}
              discount={item.discountPercentage}
              oldPrice={(item.price / (1 - (item.discountPercentage / 100))).toFixed(2)}
              id={item.id}
              key={item.id}
              brand={item.brand}
              category={item.category}
            />
          ))}
        </div>
      </div>
      <div className="cardBox">
        {mobileData.length != 0 && (
          <div className="categoryBar">
            <span></span>
            <p >Mobiles</p>
          </div>)}

        <div className="cardList">
          {mobileData.map((item) => (
            <Card
              img={item.images[2]}
              title={item.title}
              price={item.price}
              discount={item.discountPercentage}
              oldPrice={(item.price / (1 - (item.discountPercentage / 100))).toFixed(2)}
              id={item.id}
              key={item.id}
              brand={item.brand}
              category={'Mobiles'}
            />
          ))}
        </div>
      </div>
      <div className="cardBox">
        {dressesData.length != 0 && (
          <div className="categoryBar">
            <span></span>
            <p >Dresses</p>
          </div>)}

        <div className="cardList">
          {dressesData.map((item) => (
            <Card
              img={item.images[0]}
              title={item.title}
              price={item.price}
              discount={item.discountPercentage}
              oldPrice={(item.price / (1 - (item.discountPercentage / 100))).toFixed(2)}
              id={item.id}
              key={item.id}
              brand={'No Brand'}
              category={item.category}
            />
          ))}
        </div>
      </div>
      <div className="cardBox">
        {cosmeticsData.length != 0 && (
          <div className="categoryBar">
            <span></span>
            <p >Beauty</p>
          </div>)}

        <div className="cardList">
          {cosmeticsData.map((item) => (
            <Card
              img={item.images[0]}
              title={item.title}
              price={item.price}
              discount={item.discountPercentage}
              oldPrice={(item.price / (1 - (item.discountPercentage / 100))).toFixed(2)}
              id={item.id}
              key={item.id}
              brand={item.brand}
              category={item.category}
            />
          ))}
        </div>
      </div>
      <div className="cardBox">
        {furnitureData.length != 0 && (
          <div className="categoryBar">
            <span></span>
            <p >Furniture</p>
          </div>)}

        <div className="cardList">
          {furnitureData.map((item) => (
            <Card
              img={item.images[0]}
              title={item.title}
              price={item.price}
              discount={item.discountPercentage}
              oldPrice={(item.price / (1 - (item.discountPercentage / 100))).toFixed(2)}
              id={item.id}
              key={item.id}
              brand={item.brand}
              category={item.category}
            />
          ))}
        </div>
      </div>

      <SideNav />
    </div>

  )
}
