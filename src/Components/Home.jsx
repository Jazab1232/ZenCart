import React from 'react'
import '../style/home.css'
import Card from './Card'
import { useOutletContext } from 'react-router-dom';

export default function Home() {
  // const [data, setData] = useState([])
  const {data} = useOutletContext();

  // useEffect(() => {
  //   fetch('https://dummyjson.com/products?limit=194')
  //     .then((res) => {
  //       return res.json()
  //     })
  //     .then((data) => {
  //       setData(data.products)
  //     })
  // }, [])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(firestore, "data"));
  //       querySnapshot.forEach((doc) => {
  //         console.log(`${doc.id} => ${doc.data()}`);
  //         setData(doc.data().data)
  //       });
  //     } catch (e) {
  //       console.error("Error fetching documents: ", e);
  //     }
  //   };
  //   fetchData();
  //   return () => {
  //   };
  // }, []);


  // useEffect(() => {
  //   const addDataToFirestore = async () => {
  //     try {
  //       await setDoc(doc(firestore, "data", "productData"), { data });
  //       console.log("Data successfully written!");
  //     } catch (e) {
  //       console.error("Error adding document: ", e);
  //     }
  //   };

  //   addDataToFirestore();

  //   return () => {
  //   };
  // }, [5000]);




  let LaptopData = data.filter((item) => {
    return item.category == 'laptops'
  })
  let mobileArray = data.filter((item) => {
    return item.category == "smartphones"
  })
  let mobileData = mobileArray.slice(0, 5);

  let furnitureData = data.filter((item) => {
    return item.category == 'furniture'
  })
  let dressesData = data.filter((item) => {
    return item.category == 'tops'
  })
  let cosmeticsData = data.filter((item) => {
    return item.category == "beauty"
  })


  return (
    <div className='home'>
      <div className="cardBox">
        <div className="categoryBar">
          <span></span>
          <p >Laptop</p>
        </div>
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
        <div className="categoryBar">
          <span></span>
          <p >Mobiles</p>
        </div>
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
        <div className="categoryBar">
          <span></span>
          <p >Dresses</p>
        </div>
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
        <div className="categoryBar">
          <span></span>
          <p >Beauty</p>
        </div>
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
        <div className="categoryBar">
          <span></span>
          <p >Furniture</p>
        </div>
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
    </div>

  )
}
