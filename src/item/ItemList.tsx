import React from "react";

import Loader from "../loader/Loader";

import Item from "./types";
import ItemComp from "./Item";
import styles from "./item.module.css";
import ItemService from "./itemService";

interface Props {
  items: Item[];
  itemService: ItemService | undefined;
  itemIsLoading: boolean;
  setItemIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ItemsList: React.FC<Props> = ({items, itemService, setItemIsLoading, itemIsLoading}) => {
  const htmlItems: JSX.Element[] = items.map((item: Item) => (
    <ItemComp
      key={item.id}
      item={item}
      itemService={itemService}
      setItemIsLoading={setItemIsLoading}
    />
  ));

  return <div className={styles.itemList}>{itemIsLoading ? <Loader /> : htmlItems}</div>;
};

export default ItemsList;
