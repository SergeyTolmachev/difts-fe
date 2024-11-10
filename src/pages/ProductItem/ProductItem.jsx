import React, { useState } from "react";
import { ProductModal } from "@/components/ProductModal/ProductModal";
import styles from "./ProductItem.module.scss";

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
            <span className={styles.product_price}>
              ${product.price.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <h3>{selectedProduct.name}</h3>
          <img src={selectedProduct.image} alt={selectedProduct.name} />
          <p>{selectedProduct.description}</p>
          <span>${selectedProduct.price.toFixed(2)}</span>
        </ProductModal>
      )}
    </>
  );
};

export default ProductItem;
