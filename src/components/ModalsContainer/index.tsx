import React from "react";
import styles from "./ModalContainer.module.scss";

interface ModalContainerProps {
  title: string;
  actionName: string;
  type: "danger" | "normal";
  action: () => void;
  closeModal: () => void;
  children: React.ReactNode;
}

const ModalContainer: React.FC<ModalContainerProps> = ({
  title,
  actionName,
  type,
  action,
  closeModal,
  children,
}) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <h1 className={styles.title}>{title}</h1>
        <div>{children}</div>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${
              type === "danger"
                ? styles.dangerBg + " danger-bg"
                : styles.normalBg + " normal-bg"
            }`}
            onClick={action}
          >
            {actionName}
          </button>
          <button
            className={styles.cancelButton}
            onClick={() => {
              closeModal();
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
