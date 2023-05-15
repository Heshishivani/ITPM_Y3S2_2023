// CartScreen.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartItems, getTotals, removeFromCart, getCartTotalAmount, getCartTotalQuantity } from '../features/slice/cartSlice';
import CartItem from '../components/CartItem';
import jsPDF from 'jspdf';
import { PayPalButton } from "react-paypal-button-v2";



const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItems);
  const totalQuantity = useSelector(getCartTotalQuantity);
  const totalAmount = useSelector(getCartTotalAmount);

  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]);

  const removeHandler = (cartItems) => {
    dispatch(removeFromCart(cartItems));
  };

  const printBill = (cartItems, totalQuantity, totalAmount) => {
    const doc = new jsPDF();
  
    doc.setFontSize(18);
    doc.text('Shopping Cart', 15, 15);
  
    let yPos = 30;
  
    cartItems.forEach((item, index) => {
      doc.setFontSize(12);
      doc.text(`${index + 1}. ${item.name}`, 15, yPos);
      doc.text(`   Price: $${item.price}`, 90, yPos);
      doc.text(`   Quantity: ${item.cartQuantity}`, 130, yPos);
      yPos += 10;
    });
  
    doc.setFontSize(14);
    doc.text(`Subtotal (${totalQuantity} items): $${totalAmount.toFixed(2)}`, 15, yPos + 10);
  
    doc.save('bill.pdf');
  };
  const paypalOptions = {
    clientId: "EPLr__gt7r6CGL-Gd_n0V-dxC3FQEs87EmLJQOvHKxTJ_LJY47SrpYWkJLtTUv4bRsUViJw--l7AZr1r",
    currency: "USD"
  };

  const onSuccess = (details, data) => {
    console.log("Transaction completed by " + details.payer.name.given_name);
    // TODO: Dispatch an action to mark the order as paid in your Redux store
  };

  const onCancel = (data) => {
    console.log("Transaction cancelled");
  };

  const onError = (err) => {
    console.error(err);
  };
  return (
    <div className='cartscreen'>
      <div className="cartscreen-left">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/">Add Products to your cart!</Link>
          </div>
        ) : cartItems.map(item => (
          <CartItem key={item._id} item={item} removeHandler={removeHandler}/>
        ))}
      </div>
      <div className="cartscreen-right">
        <div className="cartscreen-info">
          <p>Subtotal ({totalQuantity}) items</p>
          <p>${totalAmount.toFixed(2)}</p>
        </div>
        <div>
          <Link to="/payment">
            <button>Proceed to Checkout</button>
          </Link>
        </div>
        <div>
        <div>
          <a href="https://www.paypal.com/myaccount/transfer/?from=Header"> 
          <button>Proceed with Paypal</button>
          </a>
        </div>
        </div>
        <div>
  <button class="btn btn-primary" onClick={() => printBill(cartItems, totalQuantity, totalAmount)}>Print Bill</button>
</div>

      </div>
    </div>
  );
};

export default CartScreen;
