import React from 'react';
export default function Home(){
  return (
    <div>
      <section className="hero">
        <div style={{flex:1}}>
          <h1 style={{fontSize:40,margin:0}}>LOCKED IN</h1>
          <p style={{marginTop:8,fontSize:18}}>Streetwear built for movement. Minimal. Bold. Yours.</p>
          <div style={{marginTop:16}}>
            <button className="btn" onClick={()=>window.location.href='/shop'}>Shop Now</button>
          </div>
        </div>
        <div style={{flex:1}}>
          <img src="/assets/products/tshirt1.jpg" alt="hero" style={{width:'100%',borderRadius:12}} />
        </div>
      </section>
    </div>
  );
}