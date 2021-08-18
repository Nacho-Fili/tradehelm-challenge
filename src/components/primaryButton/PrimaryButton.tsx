import React, {CSSProperties} from "react";

import styles from "./primaryButton.module.css";

interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style?: CSSProperties;
  type?: "submit" | "reset" | "button" | undefined;
  enabled?: boolean;
}

const PrimaryButton: React.FC<Props> = ({onClick, style, type, children, enabled = true}) => {
  const state = enabled ? "enabled" : "disabled";
  const clickable = enabled ? "clickable" : "";

  return (
    <button
      className={`${styles.primaryButton} ${styles[state]} ${!!clickable && clickable}`}
      disabled={!enabled}
      style={style}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
