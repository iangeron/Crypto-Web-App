import React from 'react'
import Carousel from './Carousel'



const Banner = () => {
  return (
    
    <div className='banner'>
        <div className='h2p'>
            <div>
            <h2 className='cc'>
            CryptoCurrency
            </h2>
            <p className='paragraph'>
            Get all the info of Your Favorite Crypto Currency
            </p>
            </div>
            
        </div>
        <Carousel />
    </div>
  )
}

export default Banner