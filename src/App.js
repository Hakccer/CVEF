import logo from './logo.svg';
import './App.css';
import Home from './components/home/Home';
import { Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import Login from './components/login/Login';
import DappBar from './components/bar/DappBar'
import Signup from './components/signup/Signup';
import Verify from './components/verify/Verify';
import Logouter from './components/Logouter';

function App() {
  const my_theme = createTheme({
    palette: {
      mode: 'dark',
      tomato: {
        main: '#ff6347'
      },
      darkie: {
        main: '#272727'
      },
      wheater: {
        main: '#F0F2F4'
      }
    }
  })
  return (
    <ThemeProvider theme={my_theme}>
      <DappBar></DappBar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/verify_email' element={<Verify></Verify>}></Route>
        <Route path='/logout' element={<Logouter></Logouter>}></Route>
      </Routes >
    </ThemeProvider>
  );
}

export default App;
