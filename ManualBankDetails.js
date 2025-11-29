import React from 'react';
export default function ManualBankDetails({ subtotal }){
  return (
    <div className="p-3 border rounded">
      <p><strong>Bank transfer instructions</strong></p>
      <p>Make a transfer to:</p>
      <ul>
        <li>Bank: ACCESS BANK</li>
        <li>Account Name: LOCKED IN</li>
        <li>Account Number: 0123456789</li>
      </ul>
      <p>Use your order reference as the transfer description. After completing the transfer, email proof to hello@lockedin.example with your order reference.</p>
      <p><em>Note: replace the bank details above with your real account info in production.</em></p>
    </div>
  );
}