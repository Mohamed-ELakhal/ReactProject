import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

import { uiActions } from '../../Store/ui-slice';

import { useDispatch, useSelector } from 'react-redux';

const HeaderCartButton = (props) => {
  const dispatch = useDispatch();
  const cartItemsSelector = useSelector((state) => state.cart.totalQuantity);
  const handleCartShow=()=>{
    dispatch(uiActions.toggle());
  }
  return (
    <button className={classes.button} onClick={handleCartShow}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartItemsSelector}</span>
    </button>
  );
};

export default HeaderCartButton;
