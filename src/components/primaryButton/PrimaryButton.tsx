import React, {CSSProperties} from "react";

import styles from "./primaryButton.module.css";

interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style?: CSSProperties;
  type?: "submit" | "reset" | "button" | undefined;
}

const PrimaryButton: React.FC<Props> = ({onClick, style, type, children}) => {
  return (
    <button
      className={`${styles.primaryButton} clickable`}
      style={style}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
