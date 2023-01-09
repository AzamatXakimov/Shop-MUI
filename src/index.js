import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from './context/AuthContext';
import { MeProvider } from './context/MeContext';
import { CartProvider } from "react-use-cart"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <MeProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </MeProvider>
            </AuthProvider>
        </BrowserRouter>
    // </React.StrictMode>
);