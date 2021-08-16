import React, {CSSProperties, useState} from "react";

import PrimaryButton from "../primaryButton/PrimaryButton";
import ItemService from "../../item/itemService";

import styles from "./modal.module.css";
interface Props {
  show: boolean;
  onClose: () => void;
  itemService: ItemService;
}

const Modal: React.FC<Props> = ({show, onClose, itemService}) => {
  const [state, setState] = useState("");

  const style: CSSProperties = {
    height: "60%",
    width: "90%",
    gridColumn: "3/4",
    justifySelf: "flex-end",
    alignSelf: "center",
  };

  if (!show) return null;

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalInner}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            !!itemService && itemService.create(state);
            onClose();
          }}
        >
          <h2>Add item</h2>
          <input
            autoFocus
            name="name"
            type="text"
            onChange={({target}) => setState(target.value)}
          />
          <button className={`${styles.secondaryButton} clickable`} type="button" onClick={onClose}>
            Close
          </button>
          <PrimaryButton style={style} type="submit">
            Add
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default Modal;
