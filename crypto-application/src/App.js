import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Coinpage from './Page/Coinpage';
import Homepage from './Page/Homepage';
import { makeStyles } from "@material-ui/core";
// import { ThemeProvider, createTheme } from '@material-ui/core';


// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });


function App() {
  
  

  const useStyles = makeStyles(() => ({
    App: {
      
      color: "black",
      minHeight: "100vh",
    }
  }));

  const classes = useStyles()
  
  return (
      <div className={classes.App}>
        
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} exact />
            <Route path="/coins/:id" element={<Coinpage />} />
          </Routes>
        </Router>
        
      </div>
    
  );
}

export default App;
