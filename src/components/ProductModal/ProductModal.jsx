import React from "react";
import styles from "./ProductModal.module.scss";

export const ProductModal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <div className={`${styles.modal} ${isOpen ? styles.open : ""}`}>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};
