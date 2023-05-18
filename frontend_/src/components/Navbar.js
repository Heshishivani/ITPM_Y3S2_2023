import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCartTotalQuantity } from '../features/slice/cartSlice';

const Navbar = ({click}) => {
    const totalQuantity = useSelector(getCartTotalQuantity)
  return (
    <nav className='navbar'>
        
        <div className="navbar-logo">
            <Link to="/"><h2>Shopping cart</h2></Link>
        </div>
        {/** links */}
        <ul className="navbar-links">
            <li>
                <Link to="/cart" className='cart-link'>
                    <i className='fas fa-shopping-cart'></i>
                    <span>
                        Cart
                        <span className='cartlogo-badge'>{totalQuantity}</span>
                    </span> 
                    
                </Link>
            </li>
        </ul>
        
        <div className="hamburger-menu" onClick={click}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </nav>
  )
}

export default Navbar