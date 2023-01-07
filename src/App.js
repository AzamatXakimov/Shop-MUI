import React from 'react';
import { Route, Routes } from 'react-router-dom';
import "./assets/css/stylese.css"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Admin } from './pages/admin/Admin';
import { Main } from './pages/main/Main';
export const App = () => {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    return <>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Routes>
                <Route path="/" element={<Main />}/>
                <Route path="/admin/*" element={<Admin />}/>
            </Routes>
        </ThemeProvider>
    </>
}
