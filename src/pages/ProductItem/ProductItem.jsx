import React, { useState } from "react";
import { ProductModal } from "@/components/ProductModal/ProductModal";
import styles from "./ProductItem.module.scss";
import tonIcon from "../../../assets/tonIcon.svg";

const ProductItem = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={styles.product_list}>
        {products.map((product) => (
          <div
            key={product.id}
            className={styles.product_item}
            onClick={() => handleProductClick(product)}
          >
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
          </div>
        ))}
      </div>
      {selectedProduct && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className={styles.modal}
        >
          {selectedProduct.image ? (
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className={styles.modal_image}
            />
          ) : (
            <div className={styles.gift_img_modal}>🎁</div>
          )}
          <h3 className={styles.modal_title}>
            {selectedProduct.name}
            <span className={styles.modal_price}>
              <img src={tonIcon} alt="TON" className={styles.ton_icon} />
              {selectedProduct.price.toFixed(2)}
            </span>
          </h3>
          <p className={styles.modal_description}>
            {selectedProduct.description}
          </p>
          <button className={styles.send_gift_button}>Buy</button>
        </ProductModal>
      )}
    </>
  );
};

export default ProductItem;
