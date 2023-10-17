import { useSelector,useDispatch } from 'react-redux';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import { uiActions } from '../../Store/ui-slice';
import Checkout from "./Checkout/CheckoutForm"
import { useState } from 'react';

const Cart = (props) => {



  const cartItemsSelector = useSelector((state) => state.cart.items);
  const [checkout,setCheckout]=useState(false);
  const dispatch = useDispatch();
  const handleCloseCart=()=>{
    dispatch(uiActions.toggle());
  }

  const handleOrder=()=>{
    setCheckout(true);
  }
  const hanldeCloseCheckout=()=>{
    setCheckout(false)
  }


  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartItemsSelector.map((item) => (
        <CartItem
        key={item.id}
        item={{
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
        }}
        />
      ))}
    </ul>
  );
  const totalAmount=cartItemsSelector.reduce((prevTotalAmount, item) => {
    return prevTotalAmount + item.totalPrice;
  }, 0);
  const hasItems=cartItemsSelector.length > 0;

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$${totalAmount.toFixed(2)}`}</span>
      </div>
      <hr/>
      {checkout &&
        <Checkout onCancel={hanldeCloseCheckout} />
       }
      {!checkout &&  
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={handleCloseCart}>
          Close
        </button>
       {hasItems && <button onClick={handleOrder} className={classes.button}>Checkout</button>}
      </div>}
    </Modal>
  );
};

export default Cart;
