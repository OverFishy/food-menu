import React from "react";
import styles from "./Header.module.css";
import meals from "../../assets/meals.jpeg";
import HeaderCartbutton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartbutton onShowCart={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={meals} alt="A table filled with food" />
      </div>
    </>
  );
};

export default Header;
