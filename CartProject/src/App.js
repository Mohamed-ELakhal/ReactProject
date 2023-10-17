import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import Notification from "./components/UI/Notification/Notification";
import { uiActions } from "./Store/ui-slice";
import { cartActions } from "./Store/cart-slice";

let isInitial = true;

function App() {
  const cartIsShown = useSelector((state) => state.ui.cartIsVisible);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const fetchCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Fetching...",
          message: "Fetching cart data!",
        })
      );
      const response = await fetch(
        "https://firstdatabase-fc42f-default-rtdb.firebaseio.com/react.json"
      );

      if (!response.ok) {
        throw new Error("Fetching cart data failed.");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Fetching cart data successfully!",
        })
      );
      const Data=await response.json();
      dispatch(cartActions.replaceCart({items:Data.items|| [],
        totalQuantity:Data.totalQuantity}));
      isInitial=true;
    };
    
    
    
    fetchCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    });
  }, [dispatch]);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );
      const response = await fetch(
        "https://firstdatabase-fc42f-default-rtdb.firebaseio.com/react.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    });
  }, [cart, dispatch]);
  return (
    <Fragment>
      <Header />

      <main>
        <Meals />
      </main>
      {cartIsShown && <Cart />}
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </Fragment>
  );
}

export default App;
