import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app.js';
import Store from './store.js';
import {cartInfo, cartProducts, products} from "./data";

const store = new Store({
  products:products,
  cart:{
    products:cartProducts,
    info:cartInfo
  }
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);
