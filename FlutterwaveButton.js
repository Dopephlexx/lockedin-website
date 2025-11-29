import React from 'react';
const FLW_PUB = process.env.REACT_APP_FLW_KEY || 'FLWPUBK_TEST_REPLACE';

export default function FlutterwaveButton({ amount, customer, onSuccess }){
  function pay(){
    if(!window.FlutterwaveCheckout){ alert('Flutterwave SDK not loaded'); return; }
    window.FlutterwaveCheckout({
      public_key: FLW_PUB,
      tx_ref: 'LCK-'+Date.now(),
      amount: amount,
      currency: 'NGN',
      customer: { email: customer.email || 'customer@example.com', name: customer.fullName || 'Customer' },
      callback: function(resp){
        const order = { id: resp.transaction_id || resp.tx_ref, method: 'flutterwave', amount, customer };
        onSuccess(order);
      },
      onclose: function(){ console.log('closed'); }
    });
  }
  return (<div><script src="https://checkout.flutterwave.com/v3.js"></script><button className="btn" onClick={pay}>Pay with Flutterwave</button></div>);
}