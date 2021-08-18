import React, {CSSProperties, useState, useContext} from "react";

import userContext from "../../user/UserContext";
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
  const [enabled, setEnabled] = useState(false);
  const userLogged = useContext(userContext);

  const style: CSSProperties = {
    height: "60%",
    width: "90%",
    gridColumn: "3/4",
    justifySelf: "flex-end",
    alignSelf: "center",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {target} = e;

    setState(target.value);
    setEnabled(target.value.length === 0 ? false : true);
  };

  if (!show) return null;

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalInner}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            !!itemService && itemService.create(state, userLogged);
            onClose();
          }}
        >
          <h2>Add item</h2>
          <input autoFocus name="name" type="text" onChange={handleChange} />
          <button className={`${styles.secondaryButton} clickable`} type="button" onClick={onClose}>
            Close
          </button>
          <PrimaryButton enabled={enabled} style={style} type="submit">
            Add
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default Modal;
