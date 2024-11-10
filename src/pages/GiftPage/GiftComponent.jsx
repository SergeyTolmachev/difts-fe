import styles from "./GiftComponent.module.scss";
import GiftIcon from "../../../assets/tonIcon.svg";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BottomModal } from "../../components/Modal/BottomModal";
import { useNavigate } from "react-router-dom";

const fetchCountries = async () => {
  const headers = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "open",
    Authorization:
      "user=%7B%22id%22%3A1635638906%2C%22first_name%22%3A%22Narek%22%2C%22last_name%22%3A%22Shaghoyan%22%2C%22username%22%3A%22narek_shaghoyan%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=2486925991575857822&chat_type=private&auth_date=1731179557&hash=9431b5b46f2542d99357b7cce0b1cd728865ca38b45988930842b94151a88eb9",
  };

  try {
    const response = await axios.get(
      "https://b526-134-209-85-35.ngrok-free.app/api/countries",
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении стран:", error);
    throw error;
  }
};

export const GiftComponent = () => {
  const [tonPrice, setTonPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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

  const {
    data: countries,
    error: countriesError,
    isLoading: isCountriesLoading,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  if (isCountriesLoading) return <div>Загрузка стран...</div>;

  if (countriesError)
    return <div>Ошибка при получении стран: {countriesError.message}</div>;

  const handleCountrySelect = (countryCode) => {
    navigate(`/products/${countryCode}`);
  };

  return (
    <div className={styles.gift_container}>
      <div className={styles.currency_circle}>
        <img src={GiftIcon} alt="Gift Icon" className={styles.gift_icon} />
        {tonPrice}
      </div>
      <div className={styles.gift_img}>🎁</div>
      <div className={styles.gift_title}>Send joy instantly!</div>
      <br />
      {/* <div className={styles.gift_description}>description</div> */}

      <button
        className={styles.send_gift_button}
        onClick={() => setIsModalOpen(true)}
      >
        Send a gift
      </button>
      <BottomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={styles.country_list}>
          {countries.data.map((country) => (
            <div
              className={styles.country_item}
              key={country.code}
              onClick={() => handleCountrySelect(country.code)}
            >
              {country.name}
            </div>
          ))}
        </div>
      </BottomModal>
      {/* <TonConnectButton className={styles.connect_wallet_button} /> */}
    </div>
  );
};
