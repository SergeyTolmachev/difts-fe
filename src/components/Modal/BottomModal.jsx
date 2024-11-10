import React from "react";
import styles from "./BottomModal.module.scss";

export const BottomModal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <div className={`${styles.modal} ${isOpen ? styles.open : ""}`}>
        <div className={styles.content}>
          <button className={styles.close_button} onClick={onClose}>
            Закрыть
          </button>
          {children}
        </div>
      </div>
    </>
  );
};
