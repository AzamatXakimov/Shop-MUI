import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from './context/AuthContext';
import { MeProvider } from './context/MeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <MeProvider>
                    <App />
                </MeProvider>
            </AuthProvider>
        </BrowserRouter>
    // </React.StrictMode>
);