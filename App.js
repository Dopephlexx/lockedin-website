import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ShopPage from './pages/ShopPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccess from './pages/OrderSuccess';
import Home from './pages/Home';

export default function App(){
  const [cart, setCart] = useState([]);
  return (
    <BrowserRouter>
      <header className="header container">
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <img src="/assets/logo.png" alt="logo" style={{width:48,height:48,objectFit:'contain'}} />
          <div style={{fontWeight:800,fontSize:20}}>LOCKED IN</div>
        </div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/checkout">Checkout</Link>
          <button className="btn" onClick={()=>window.location.href='/checkout'}>Cart ({cart.length})</button>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopPage addToCart={(p)=>setCart(prev=>[...prev,p])} />} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} setCart={setCart} navigate={(p,opts)=>window.location.href=p} />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </main>

      <footer style={{borderTop:'1px solid #eee',padding:'24px 0',marginTop:40}}>
        <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>© {new Date().getFullYear()} LOCKED IN</div>
          <div style={{opacity:0.7}}>Designed with care</div>
        </div>
      </footer>
    </BrowserRouter>
  );
}