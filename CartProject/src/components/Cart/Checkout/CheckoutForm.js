import useCheckout from "../../../Hooks/checkout-use";
import Modal from "../../UI/Modal";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useCheckout((value) => value.trim() !== "");
  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangedHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreetInput,
  } = useCheckout((value) => value.trim() !== "");

  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: postalCodeInputHasError,
    valueChangeHandler: postalCodeChangedHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: resetPostalCodeInput,
  } = useCheckout((value) => value.trim().length === 5);

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangedHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useCheckout((value) => value.trim() !== "");
  let formIsValid = false;


  if(enteredStreetIsValid&& enteredNameIsValid&&enteredPostalCodeIsValid&&enteredCityIsValid)
  {
    formIsValid=true; 
  }


  const nameControlClasses = `${classes.control} ${
    !nameInputHasError ? '' : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    !streetInputHasError ? '' : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    !postalCodeInputHasError ? '' : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    !cityInputHasError ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetChangedHandler}
          onBlur={streetBlurHandler}
        />
        {streetInputHasError && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text"
         id="postal"
         value={enteredPostalCode}
         onChange={postalCodeChangedHandler}
         onBlur={postalCodeBlurHandler} />
        {postalCodeInputHasError && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text"
         id="city"
         value={enteredCity}
         onChange={cityChangedHandler}
         onBlur={cityBlurHandler} />
        {cityInputHasError && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!formIsValid} className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
