import classes from './CartItem.module.css';
import { cartActions } from "../../Store/cart-slice";
import { useSelector,useDispatch } from 'react-redux';

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { title, quantity, totalPrice, id } = props.item;
  const handleAddItem=()=>{
    dispatch(
      cartActions.addItemToCart({
        id: id,
        title: title,
        quantity: 1,
        totalPrice: totalPrice/quantity,
      })
    );
  }
  const handleRemoveItem=()=>{
    dispatch(
      cartActions.removeItemFromCart({
        id: id,
        title: title,
        quantity: 1,
        totalPrice: totalPrice/quantity,
      })
    );
  }

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{title}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{`$${totalPrice.toFixed(2)}`}</span>
          <span className={classes.amount}>x {quantity}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={handleRemoveItem}>−</button>
        <button onClick={handleAddItem}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
