import styles from "./GiftComponent.module.scss";
import GiftIcon from "../../../assets/tonIcon.svg";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Функция для получения стран
const fetchCountries = async () => {
  const response = await axios.get("http://localhost:3000/countries");
  return response.data;
};

export const GiftComponent = () => {
  const [tonPrice, setTonPrice] = useState(0);

  useEffect(() => {
    const fetchTonPrice = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd"
      );
      const data = await response.json();
      setTonPrice(data["the-open-network"].usd);
    };
    fetchTonPrice();
  }, []);

  // Используем React Query для получения стран
  const {
    data: countries,
    error: countriesError,
    isLoading: isCountriesLoading,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  // Обработка состояния загрузки для стран
  if (isCountriesLoading) return <div>Загрузка стран...</div>;

  // Обработка ошибок для стран
  if (countriesError)
    return <div>Ошибка при получении стран: {countriesError.message}</div>;

  return (
    <div className={styles.gift_container}>
      <div className={styles.currency_circle}>
        <img src={GiftIcon} alt="Gift Icon" className={styles.gift_icon} />
        {tonPrice}
      </div>
      <div className={styles.gift_img}>🎁</div>
      <div className={styles.gift_title}>Список стран</div>
      <ul className={styles.gift_description}>
        {countries.map((country) => (
          <li key={country.id}>{country.name}</li>
        ))}
      </ul>
      <button className={styles.send_gift_button}>Send a gift</button>
      <TonConnectButton className={styles.connect_wallet_button} />
    </div>
  );
};
