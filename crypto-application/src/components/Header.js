import { AppBar, Container, Select, Toolbar, MenuItem, ThemeProvider } from '@material-ui/core'
import React from 'react'
import { CryptoState } from '../Context';

const Header = () => {

    const { currency, setCurrency } = CryptoState();
   
    // const darkTheme = createTheme({
    //     palette: {
    //         primary: {
    //             main: "#fff",
    //         },
    //         type:"dark",
    //     },

    // });

   

   return (
    <ThemeProvider >
    <AppBar color='white' position='sticky' elevation={10}>
        <Container>
            <Toolbar className="topbar">
                <h1 
                className="title">
                    <span >Crypto</span>
                     <span className='info'>info</span>
                </h1>

                <Select
                style={{ 
                    width: 100, 
                    height: 40, 
                    marginRight: 15 
                }} 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                variant="outlined"
                defaultValue={"CAD"}>
                    <MenuItem value={"USD"}>USD</MenuItem>
                    <MenuItem value={"CAD"}>CAD</MenuItem>
                </Select>
            </Toolbar>
        </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header