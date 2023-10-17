
import { useSelector,useDispatch } from 'react-redux';
import React from 'react';

import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
import { cartActions } from "../../../Store/cart-slice";
import { useRef, useState } from "react";
const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const inputRef = useRef();
  const dispatch = useDispatch();


  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = inputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    dispatch(
      cartActions.addItemToCart({
        id: props.id,
        title: props.name,
        quantity: +enteredAmount,
        totalPrice: +props.price*+enteredAmount,
      })
    );
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
      ref={inputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
