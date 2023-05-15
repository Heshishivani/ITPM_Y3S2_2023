import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './PaymentForm.css';

const PaymentForm = () => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Card number validation
  if (cardNumber.length !== 16 || isNaN(cardNumber)) {
    alert('Please enter a valid card number');
    return;
  }

  // Expiration validation
  const expirationRegex = /^(0[1-9]|1[0-2])\/([0-9]{4})$/;
  if (!expirationRegex.test(expiration)) {
    alert('Please enter a valid expiration date (MM/YYYY)');
    return;
  }

  // CVV validation
  if (cvv.length !== 3 || isNaN(cvv)) {
    alert('Please enter a valid CVV');
    return;
  }

  if (isNaN(amount)) {
    alert('Amount should be a number');
    return;
  }

    try {
      const response = await axios.post('/api/payments', {
        name,
        cardNumber,
        expiration,
        cvv,
        amount,
      });
      console.log(response.data);
      alert('Payment was successful');
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error(error);
      alert('Payment failed');
    }
  };
  

  return (
    <div className="payment-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name on Card:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiration">Expiration:</label>
          <input
            type="text"
            id="expiration"
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentForm;
