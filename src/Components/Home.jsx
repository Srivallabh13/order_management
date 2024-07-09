import React from 'react'
import Product from './Product'
import axios from 'axios'

const Home = () => {
    const products = {
     0: {
        Name: "Iphone",
        Price: 100000,
      Desc:"Lorem Ipsum"

     },
     1: {
        Name: "Tablet",
        Price: 25000,
      Desc:"Lorem Ipsum"
     },
     2:{
        Name: "TV",
        Price: 750000,
      Desc:"Lorem Ipsum"
     },
     3:{
      Name:"PS5",
      Price: 50000,
      Desc:"Lorem Ipsum"
     },
     4:{
      Name:"Nike Jordan",
      Price: 20000,
      Desc:"Lorem Ipsum"
     },
     5:{
      Name:"Ipad",
      Price: 50000,
      Desc:"Lorem Ipsum"
     }
    } 
    return (
    <div className='bg-zinc-100 p-5'>
      <div className='flex flex-wrap mx-16 gap-10'>
        {Object.keys(products).map(key => (
          <Product
              key={key} 
              name={products[key].Name}
              price={products[key].Price}
              desc={products[key].Desc}
          />
        ))}
      </div>
    </div>
  )
}

export default Home