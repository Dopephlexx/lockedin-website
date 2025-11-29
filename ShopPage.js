import React from 'react';
import products from '../data/products';
export default function ShopPage({ addToCart }){
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Shop LOCKED IN</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((item) => (
          <div key={item.id} className="card">
            <img src={item.image} alt={item.name} className="product-image" />
            <h3 className="text-xl font-semibold mt-3">{item.name}</h3>
            <p className="text-lg font-bold text-gray-700 mt-1">₦{item.price.toLocaleString()}</p>
            <button className="mt-4 btn" onClick={()=>addToCart({...item, qty:1})}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}