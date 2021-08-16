import React from "react";

import ItemType from "./types";
import styles from "./item.module.css";
import ItemService from "./itemService";

interface Props {
  item: ItemType;
  itemService: ItemService | undefined;
}

const Item: React.FC<Props> = ({item, itemService}) => {
  return (
    <div className={styles.itemDetail}>
      <p className={styles.descriptionText}>{item.name}</p>
      <p
        className={`${styles.deleteText} clickable`}
        role="button"
        onClick={() => !!itemService && itemService.remove(item.id)}
      >
        delete
      </p>
    </div>
  );
};

export default Item;
