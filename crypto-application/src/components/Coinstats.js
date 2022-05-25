import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { CryptoState } from '../Context'
import { SingleCoin } from '../config/api';
import { useParams } from 'react-router-dom'
import { GrMoney } from "react-icons/gr";
import { AiOutlineRise, AiOutlineFall } from "react-icons/ai";
import { IoPricetagsSharp } from "react-icons/io5";
import { FiArrowUp } from 'react-icons/fi'


function commas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Coinstats = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  const percentChange = (
    (((coin?.market_data.ath[currency.toLowerCase()]) - (coin?.market_data.atl[currency.toLowerCase()])) / (coin?.market_data.atl[currency.toLowerCase()]))*100
    )

  console.log(coin);

  console.log(percentChange)
  
  useEffect(() => {
    fetchCoin();
  }, []);
  
      
    return (
    <div className='right'>
      <div className='toppart'> 
        <img
           src={coin?.image.large}
           alt={coin?.name}
           height="100"
            style={{ marginBottom: 20 }}
          />
          <span className='name'>{coin?.name}</span>
      </div>
      <div className='stats'>
        <div>
            <IoPricetagsSharp className='icon'/> Current Price: <span  className='price'> {symbol} {(coin?.market_data.current_price[currency.toLowerCase()])} </span>
        </div>
        <div>
            <AiOutlineRise className='green'/> All-Time High: {symbol} {(coin?.market_data.ath[currency.toLowerCase()])}
        </div>
        <div>
          ATL to ATH  <span className='greenv'><FiArrowUp /> {(commas(percentChange.toFixed(2)))}%</span>
        </div>
        <div>
            <AiOutlineFall className='red'/> All-Time Low: {symbol} {(coin?.market_data.atl[currency.toLowerCase()])}
        </div>
        <div>
            <GrMoney className='gold'/> Total Volume: {symbol} {(coin?.market_data.total_volume[currency.toLowerCase()])}
        </div>
      </div>
    </div>
  )
}

export default Coinstats