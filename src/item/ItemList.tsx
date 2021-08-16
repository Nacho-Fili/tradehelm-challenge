import React from "react";

import Item from "./types";
import ItemComp from "./Item";
import styles from "./item.module.css";
import ItemService from "./itemService";

interface Props {
  items: Item[];
  itemService: ItemService | undefined;
}

const ItemsList: React.FC<Props> = ({items, itemService}) => {
  const htmlItems: JSX.Element[] = items.map((item: Item) => (
    <ItemComp key={item.id} item={item} itemService={itemService} />
  ));

  return <div className={styles.itemList}>{htmlItems}</div>;
};

export default ItemsList;
