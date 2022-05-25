import axios from 'axios';
import React from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../Context'
import { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
// import * as React from 'react';
import { Table } from '@material-ui/core';
import { LinearProgress } from '@material-ui/core'
import { TableBody } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableContainer }from '@material-ui/core';
import { TableHead } from  '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
// import { FiArrowUp, FiArrowDown } from 'react-icons/fi'
import Pagination from "@material-ui/lab/Pagination";
import { useNavigate } from 'react-router-dom';


export function commas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}




const Cointable = () => {
  
  const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
  
    const { currency, symbol } = CryptoState();

    const navigate = useNavigate();

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));

        setCoins(data)
        setLoading(false);
    };

    console.log(coins);

    useEffect(() => {
      fetchCoins();
    }, [currency])

    
    const handleSearch = () => {
      return coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
      );
    };

    // const value = () => {
    //   return coins.price_change_percentage_24h.sort((a, b) => 
    //    b - a
    //   )};
    // };
    

    // console.log
        
   
  
    return (
<div className='searchCon'>
    <div className='topC'>
    <h4>TOP 100 CRYPTOCURRENCIES</h4></div>
    <div className='s'>
    <TextField id="outlined-basic" 
            label="Coin Search." 
            variant="outlined"
            className='searchBar' 
            onChange={(e) => setSearch(e.target.value)}
    /></div>
    <div className='container'>
      <TableContainer component={Paper} elevation={20} style={{  borderRadius: 10 , marginTop: 30 , minwidth: 450 , maxWidth: 2000,  }} >
    {loading ? (
            <LinearProgress style={{ backgroundColor: "green" }} />
          ) : (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ backgroundColor: 'black' }}>
          <TableRow  >
            <TableCell align='center'><span className='wordTwo'>Coins</span></TableCell>
            <TableCell  align='center' style={{ width: "15%" }}><span className='wordTwo'>Last 7 Days</span></TableCell>
            <TableCell align="center"><span className='wordTwo'>Price</span></TableCell>
            <TableCell align="center"><span className='wordTwo'>24h</span></TableCell>
            <TableCell align="center"><span className='wordTwo'>Volume</span></TableCell>
            <TableCell align="center"><span className='wordTwo'>Mkt Cap</span></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className='tableContent'style={{ width: 50 }}>
        {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((coin) => (
            <TableRow onClick={() => navigate(`/coins/${coin.id}`)} style={{cursor: 'pointer'}} className='rows'
              key={coin.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align='justify' className='firstColumn' component="th" scope="row">
                <div className='coins'>
                  <span className='word'>{coin.market_cap_rank}</span>  
                  <img src={coin.image} alt={coin.id} className='tableImg'/>  
                  
                    <span className='symbs'>  {coin.symbol.toUpperCase()}</span>  
                    <span className='word'> {coin.name} </span>
                  
                </div>
              </TableCell>
              <TableCell align='center'>
                <div className='sl'>
                {
                <Sparklines data={coin.sparkline_in_7d.price} width={150} height={30} margin={0}>
                { coin.sparkline_in_7d.price[167] >= coin.sparkline_in_7d.price[0]? (<SparklinesLine color="green" style={{ fill: "none" }} />) : (<SparklinesLine color="red" style={{ fill: "none" }}/>)}
                {/* <SparklinesReferenceLine type={"mean"}  style={{ stroke: 'black', strokeOpacity: .75, strokeDasharray: '2, 2' }} /> */}
                </Sparklines>
              }</div></TableCell>
              <TableCell align="center" ><span className='word'>{symbol}{commas(coin.current_price.toFixed(2))}</span></TableCell>
              <TableCell align="center">
              <span className='word'>{coin.price_change_24h >=0? 
                            (<span className='greenv'>
                              {/* <FiArrowUp className='icon' /> */}
                                +{coin.price_change_percentage_24h.toFixed(2)}%
                            </span>
                        ) : (
                            <span className='redv'>
                              {/* <FiArrowDown className='icon' /> */}
                                {coin.price_change_percentage_24h.toFixed(2)}%
                            </span>
                            )} </span>
              </TableCell>
              <TableCell align="center"><span className='word'>{symbol}{commas(coin.total_volume)}</span></TableCell>
              <TableCell align="center"><span className='word'>{symbol}{commas(coin.market_cap)}</span></TableCell>

              
            </TableRow>
          ))}
        </TableBody>
      </Table> )}
    </TableContainer></div>

    <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)} variant="outlined" shape="rounded"
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          onChange={(_, value) => {
            setPage(value);
          }}
        />
        

</div>
  )
}

export default Cointable