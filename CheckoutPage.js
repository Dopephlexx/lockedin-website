import React, { useState } from 'react';
import FlutterwaveButton from '../payments/FlutterwaveButton';
import PaystackButton from '../payments/PaystackButton';
import ManualBankDetails from '../payments/ManualBankDetails';

export default function CheckoutPage({ cart, setCart, navigate }){
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState('paystack');
  const [fulfillment, setFulfillment] = useState('delivery');
  const [form, setForm] = useState({ fullName:'', phone:'', email:'', address:'', state:'', city:'', notes:'' });

  const subtotal = cart.reduce((s,i)=>s + (i.price * (i.qty||1)), 0);

  function updateField(k,v){ setForm(prev=>({...prev,[k]:v})); }
  function placeOrderLocal(order){
    const existing = JSON.parse(localStorage.getItem('li_orders')||'[]');
    localStorage.setItem('li_orders', JSON.stringify([order,...existing]));
    setCart([]);
    navigate('/order-success', { state: { order } });
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {step===0 && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-3">Delivery / Pickup</h3>
              <div className="flex gap-4 mb-4">
                <label className={`p-3 border rounded cursor-pointer ${fulfillment==='delivery'?'border-black':''}`}>
                  <input type="radio" checked={fulfillment==='delivery'} onChange={()=>setFulfillment('delivery')} /> Delivery
                </label>
                <label className={`p-3 border rounded cursor-pointer ${fulfillment==='pickup'?'border-black':''}`}>
                  <input type="radio" checked={fulfillment==='pickup'} onChange={()=>setFulfillment('pickup')} /> Pickup
                </label>
              </div>

              <h3 className="font-semibold mb-2">Contact & Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input className="p-2 border rounded" placeholder="Full name" value={form.fullName} onChange={e=>updateField('fullName', e.target.value)} />
                <input className="p-2 border rounded" placeholder="Phone number" value={form.phone} onChange={e=>updateField('phone', e.target.value)} />
                <input className="p-2 border rounded" placeholder="Email" value={form.email} onChange={e=>updateField('email', e.target.value)} />
                <input className="p-2 border rounded" placeholder="State" value={form.state} onChange={e=>updateField('state', e.target.value)} />
                <input className="p-2 border rounded md:col-span-2" placeholder="City" value={form.city} onChange={e=>updateField('city', e.target.value)} />
                <input className="p-2 border rounded md:col-span-2" placeholder="Address" value={form.address} onChange={e=>updateField('address', e.target.value)} />
                <textarea className="p-2 border rounded md:col-span-2" placeholder="Delivery notes (optional)" value={form.notes} onChange={e=>updateField('notes', e.target.value)} />
              </div>

              <div className="flex gap-3 mt-4">
                <button className="btn" onClick={()=>setStep(1)}>Continue to Payment</button>
                <button className="btn" onClick={()=>window.location.href='/shop'}>Back to Shop</button>
              </div>
            </div>
          )}

          {step===1 && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-3">Payment Method</h3>
              <div className="flex flex-col gap-3">
                <label className="p-3 border rounded"><input type="radio" name="pm" checked={method==='paystack'} onChange={()=>setMethod('paystack')} /> Paystack (Card, Transfer, USSD)</label>
                <label className="p-3 border rounded"><input type="radio" name="pm" checked={method==='flutterwave'} onChange={()=>setMethod('flutterwave')} /> Flutterwave (Card, Transfer, USSD)</label>
                <label className="p-3 border rounded"><input type="radio" name="pm" checked={method==='bank'} onChange={()=>setMethod('bank')} /> Bank Transfer (Manual)</label>
              </div>

              <div className="mt-4">
                <button className="btn" onClick={()=>setStep(2)}>Review Order</button>
                <button className="btn" onClick={()=>setStep(0)}>Back</button>
              </div>
            </div>
          )}

          {step===2 && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-3">Review & Pay</h3>
              <div className="mb-4">
                <div className="mb-2"><strong>Shipping:</strong> {fulfillment==='delivery' ? `${form.address}, ${form.city}, ${form.state}` : 'Pickup at store'}</div>
                <div className="mb-2"><strong>Contact:</strong> {form.fullName} — {form.phone} — {form.email}</div>
                <div className="mb-2"><strong>Payment:</strong> {method}</div>
              </div>

              <div className="mt-4">
                {method==='paystack' && <PaystackButton amount={subtotal} customer={form} onSuccess={(order)=>placeOrderLocal(order)} />}
                {method==='flutterwave' && <FlutterwaveButton amount={subtotal} customer={form} onSuccess={(order)=>placeOrderLocal(order)} />}
                {method==='bank' && (
                  <div>
                    <ManualBankDetails subtotal={subtotal} />
                    <div className="mt-3"><button className="btn" onClick={()=>placeOrderLocal({id:'BANK-'+Date.now(), method:'bank', customer:form, amount:subtotal})}>Place order (Confirm)</button></div>
                  </div>
                )}
                <div className="mt-3"><button className="btn" onClick={()=>setStep(1)}>Back</button></div>
              </div>
            </div>
          )}
        </div>

        <aside className="bg-white p-4 rounded-lg shadow">
          <h4 className="font-semibold mb-3">Order Summary</h4>
          <div>
            {cart.map((c,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                <div>{c.name} x{c.qty||1}</div>
                <div>₦{(c.price * (c.qty||1)).toLocaleString()}</div>
              </div>
            ))}
            <hr/>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:8}}><strong>Subtotal</strong><strong>₦{subtotal.toLocaleString()}</strong></div>
          </div>
        </aside>
      </div>
    </div>
  );
}