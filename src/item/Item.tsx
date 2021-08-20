import React, {useContext} from "react";

import userContext from "../user/UserContext";
import Loader from "../loader/Loader";

import ItemType from "./types";
import styles from "./item.module.css";
import ItemService from "./itemService";

interface Props {
  item: ItemType;
  itemService: ItemService | undefined;
  setItemIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Item: React.FC<Props> = ({item, itemService, setItemIsLoading}) => {
  const userLogged = useContext(userContext);

  const handleClick = () => {
    setItemIsLoading(true);
    !!itemService && itemService.remove(item, userLogged);
  };

  return (
    <div className={styles.itemDetail}>
      <p className={styles.descriptionText}>{item.description}</p>
      <p className={`${styles.deleteText} clickable`} role="button" onClick={handleClick}>
        delete
      </p>
    </div>
  );
};

export default Item;
