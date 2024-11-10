import React from "react";
import styles from "./ProductItem.module.scss";

const ProductList = ({ products }) => {
  return (
    <div className={styles.product_list}>
      {products.map((product) => (
        <div key={product.id} className={styles.product_item}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className={styles.product_image}
            />
          ) : (
            <div className={styles.gift_img}>🎁</div>
          )}
          <h3 className={styles.product_title}>{product.name}</h3>
          <p className={styles.product_subtitle}>{product.description}</p>
          <span className={styles.product_price}>
            ${product.price.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
