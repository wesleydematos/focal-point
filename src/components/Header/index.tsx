import React from "react";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import styles from "./Header.module.scss";

const getFormattedDate = () => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dateString = new Date().toLocaleDateString("pt-BR", options);

  return dateString.charAt(0).toUpperCase() + dateString.slice(1);
};

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={logo} alt="Logo" width={150} height={36} />
      </div>
      <div className={styles["welcome-text"]}>Bem-vindo de volta, Marcus</div>
      <div className={styles.date}>{getFormattedDate()}</div>
    </header>
  );
}
