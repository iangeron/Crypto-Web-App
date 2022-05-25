import axios from 'axios'
import React from 'react'
import { CryptoState } from '../../Context'
import { TrendingCoins } from "../../config/api"
import { useState, useEffect } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
// import { makeStyles } from '@material-ui/core'
import { FiArrowUpRight, FiArrowDown } from 'react-icons/fi'
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { CircularProgress } from '@material-ui/core'

function commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Carousel = () => {
    const [trending, settrending] = useState([]);
    const [loading, setLoading] = useState(false);

    const { currency, symbol } = CryptoState()

    // const [coinList, setcoinList] = useState([])
    
    const fetchTrendingCoins =async () => {
        setLoading(true);
        const { data } = await axios.get(TrendingCoins(currency))

        settrending(data);

        setLoading(false)
    };
    
    console.log(trending)

    // const fetchCoinList =async () => {
    //     const { dataTwo } = await axios.get(CoinList(currency))

    //     setcoinList(dataTwo);
    // };
    
    // console.log(coinList);
    



    

    
    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);

    
    
    
    const items = trending.map((coin) => {
        let profit = coin.price_change_24h > 0;
        // let profitPerc = coin.price_change_percentage_24h > 0;
        
        
        


        return (
            <div>
            <Link className='coinformat'
            to={`/coins/${coin.id}`}>
                <img
                src={coin?.image}
                alt={coin.name}
                height="80"
                style={{ marginBottom: 10 }}
                />
                
                <span>
                    {coin.symbol}
                    &nbsp;
                    <span>
                    {coin.price_change_percentage_24h < 0 ? (
                            <span className='red'>
                                <FiArrowDown className='icon' />
                                {coin.price_change_percentage_24h.toFixed(2)}%
                            </span>
                        ) : (
                            <span className='green'>
                                <FiArrowUpRight className='icon' />
                                {coin.price_change_percentage_24h.toFixed(2)}%
                            </span>
                            )}
                    </span>
                </span>

                <span className='cryptoprice'>
                    {symbol} {commas(coin.current_price.toFixed(2))} {profit? 
                            (<span className='green'>
                                {coin.price_change_24h.toFixed(2)}
                            </span>
                        ) : (
                            <span className='red'>
                                {coin.price_change_24h.toFixed(2)}
                            </span>
                            )}
                </span>

               
                <Sparklines data={coin.sparkline_in_7d.price} width={170} height={30} margin={5}>
                { coin.sparkline_in_7d.price[167] >= coin.sparkline_in_7d.price[0]? (<SparklinesLine color="green" />) : (<SparklinesLine color="red" />)}
                </Sparklines>
                

                
            </Link>
            </div>
        );
    });

    

    const responsive = {
        0: {
          items: 2,
        },
        
        512: {
          items: 3,
        },

        1024: {
            items: 4,
        }
      };
    
  
    return (
    <div className='carousel'>
        {loading ? (
                <CircularProgress style={{ color: 'green', marginLeft: 900}}/>
              ) : (
        <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            items={items}
            autoPlay
        />)}
    </div>
  )
}

export default Carousel