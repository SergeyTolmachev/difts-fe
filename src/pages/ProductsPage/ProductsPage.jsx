import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductItem from "@/pages/ProductItem/ProductItem";
import styles from "./ProductsPage.module.scss";

const fetchProducts = async (countryCode) => {
  const headers = {
    "Content-Type": "application/json",
    'ngrok-skip-browser-warning': 'open',
    Authorization:
      "user=%7B%22id%22%3A1635638906%2C%22first_name%22%3A%22Narek%22%2C%22last_name%22%3A%22Shaghoyan%22%2C%22username%22%3A%22narek_shaghoyan%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=2486925991575857822&chat_type=private&auth_date=1731179557&hash=9431b5b46f2542d99357b7cce0b1cd728865ca38b45988930842b94151a88eb9",
  };

  try {
    const response = await axios.get(
      `https://b526-134-209-85-35.ngrok-free.app/api/products?country=${countryCode}`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении продуктов:", error);
    throw error;
  }
};

export const ProductsPage = () => {
  const { countryCode } = useParams();

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", countryCode],
    queryFn: () => fetchProducts(countryCode),
  });

  if (isLoading)
    return <div className={styles.loading_message}>Загрузка продуктов...</div>;
  if (error)
    return (
      <div className={styles.error_message}>
        Ошибка при получении продуктов: {error.message}
      </div>
    );

  return (
    <div className={styles.page_container}>
      <h2 className={styles.page_title}>Продукты для страны: {countryCode}</h2>
      <ProductItem products={products.data} />
    </div>
  );
};
