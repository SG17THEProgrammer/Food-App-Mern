import React from 'react'
import ReactDOM from 'react-dom/client';
// import {BrowserRoute}  from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './redux/index.js'
import { Provider } from 'react-redux'
import { AuthProvider } from './components/Auth.jsx';
import { Auth0Provider } from '@auth0/auth0-react';
// import {Helmet} from "react-helmet";



ReactDOM.createRoot(document.getElementById('root')).render(
    <Auth0Provider
    domain="dev-y0wwum2b4ww0shmx.us.auth0.com"
    clientId="SPn52cQ3BFrHjD3yBYko83BGhmgjzdvq"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <AuthProvider>
    {/* <React.StrictMode> */}
        <Provider store={store}>
            <App />
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                draggable
                theme="light"
                bodyClassName="toastBody"

            />
        </Provider>
    {/* </React.StrictMode> */}
</AuthProvider>
</Auth0Provider>
);
