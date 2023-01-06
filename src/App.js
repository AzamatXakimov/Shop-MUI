import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/Home';
import "./assets/css/stylese.css"
import { Header } from './components/header/header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Login } from './pages/login/Login';
import { Register } from './pages/Register/Register';
export const App = () => {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    return <>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Header/>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
            </Routes>
        </ThemeProvider>
    </>
}
