import React, { useContext, useEffect, useState } from "react";
import CardIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnAnimation, setBtnAnimation] = useState(false);

  const { items } = useContext(CartContext);

  const numOfItemsInCart = items.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);

  const btnClasses = `${styles.button} ${btnAnimation ? styles.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnAnimation(true);

    const timer = setTimeout(() => {
      setBtnAnimation(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onShowCart}>
      <span className={styles.icon}>
        <CardIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numOfItemsInCart}</span>
    </button>
  );
};

export default HeaderCartButton;
