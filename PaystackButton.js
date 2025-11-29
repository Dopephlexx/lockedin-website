import React from 'react';
const PAYSTACK_PK = process.env.REACT_APP_PAYSTACK_KEY || 'pk_test_REPLACE_PAYSTACK';

export default function PaystackButton({ amount, customer, onSuccess }){
  function pay(){
    if(!window.PaystackPop){ alert('Paystack SDK not loaded'); return; }
    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PK,
      email: customer.email || 'customer@example.com',
      amount: Math.round(amount) * 100,
      currency: 'NGN',
      callback: function(response){
        const order = { id: response.reference, method: 'paystack', amount, customer };
        onSuccess(order);
      },
      onClose: function(){ alert('Payment closed'); }
    });
    handler.openIframe();
  }
  return (<div><script src="https://js.paystack.co/v1/inline.js"></script><button className="btn" onClick={pay}>Pay with Paystack</button></div>);
}