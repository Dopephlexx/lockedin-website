import React from 'react';
import { useLocation } from 'react-router-dom';
export default function OrderSuccess(){
  const loc = useLocation();
  const order = loc.state?.order || {};
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Thank you — Order received</h2>
      <p className="mt-3">Your order reference: <strong>{order.id || 'N/A'}</strong></p>
      <p className="mt-2">We sent an email to <strong>{order.customer?.email || 'your email'}</strong> with the order summary.</p>
      <div className="mt-4">
        <a className="btn" href="/shop">Back to shop</a>
      </div>
    </div>
  );
}