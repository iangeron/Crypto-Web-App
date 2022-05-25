import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { SingleCoin } from "../config/api";
import axios from "axios";
import { useEffect } from "react"
import Coininfo from '../components/Coininfo'



const Coinpage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  console.log(coin);
  
  useEffect(() => {
    fetchCoin();
  }, []);
  
  
  // style={{
  //   backgroundImage: `url('${coin?.image.large}')`,
  //   backgroundSize: '30%',
  //   backgroundRepeat: 'no-repeat',
  //   backgroundPosition: '120% ',
  //   backgroundBlendMode: 'lighten',
  //   backdropFilter: 'blur 30px'
  //   }}>
  
  
  return (
    <>
      <div>
        
        <Coininfo coin={coin} />
        
      </div>
    </>
  )
}

export default Coinpage