import React, {useContext} from "react";

import userContext from "../user/UserContext";

import ItemType from "./types";
import styles from "./item.module.css";
import ItemService from "./itemService";

interface Props {
  item: ItemType;
  itemService: ItemService | undefined;
}

const Item: React.FC<Props> = ({item, itemService}) => {
  const userLogged = useContext(userContext);

  return (
    <div className={styles.itemDetail}>
      <p className={styles.descriptionText}>{item.description}</p>
      <p
        className={`${styles.deleteText} clickable`}
        role="button"
        onClick={() => !!itemService && itemService.remove(item, userLogged)}
      >
        delete
      </p>
    </div>
  );
};

export default Item;
