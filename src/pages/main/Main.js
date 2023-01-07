import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../home/Home';
import { Header } from '../../components/header/header';
import { Login } from '..//login/Login';
import { Register } from '../Register/Register';
export const Main = () => {
    return <>
        <Header/>
        <Routes>
            <Route index element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
        </Routes>
    </>
}
