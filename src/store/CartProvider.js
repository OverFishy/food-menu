import { useReducer } from "react";

import React from "react";
import CartContext from "./cart-context";

const defaultCart = {
  items: [],
  totalAmount: 0
};

const cartRedecuer = (state, action) => {
  // Checking if the new dish we try to add is already in the order
  const existingCartItemIndex = state.items.findIndex(
    (item) => item.id === action.item.id
  );

  // If it's there we will fetch it, if not we will fetch null
  const existingCartItem = state.items[existingCartItemIndex];
  let updatedItems;

  if (action.type === "ADD") {
    // If it already exists, we will add to the amount the new dishes
    if (existingCartItem) {
      const updatedCartItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedCartItem;

      // We will push it as a new dish
    } else {
      updatedItems = state.items.concat(action.item);
    }

    // Adding to the total amount the cost of the new dishes we are adding
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: +updatedTotalAmount
    };
  }

  if (action.type === "REMOVE") {
    // We will just remove one item from amount
    if (existingCartItem.amount > 1) {
      const updatedCartItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedCartItem;
    } else {
      // We will remove the item from the items list completely
      updatedItems = state.items.filter((item) => item.id !== action.item.id);
    }

    let updatedTotatlAmount = state.totalAmount - existingCartItem.price;
    if (updatedTotatlAmount <= 0) {
      updatedTotatlAmount = 0;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotatlAmount
    };
  }

  return defaultCart;
};
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartRedecuer, defaultCart);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD",
      item
    });
  };

  const removeItemFromCartHadnler = (item) => {
    dispatchCartAction({
      type: "REMOVE",
      item
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHadnler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
