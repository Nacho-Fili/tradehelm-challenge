import React, {useState, useEffect} from "react";

import PrimaryButton from "../components/primaryButton/PrimaryButton";
import Modal from "../components/modal/Modal";

import ItemList from "./ItemList";
import styles from "./item.module.css";
import Item from "./types";
import ItemService from "./itemService";

interface Props {
  itemService: ItemService;
}

const ItemsListContainer: React.FC<Props> = ({itemService}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    itemService.setSetter(setItems);
    itemService.fetchAll();
  }, [itemService]);

  return (
    <div className={styles.itemContainer}>
      <p className={styles.itemCount} style={{fontSize: "1.4rem"}}>{`${items.length} ${
        items.length === 1 ? "item" : "items"
      }`}</p>
      <ItemList itemService={itemService} items={items} />
      <PrimaryButton onClick={() => setShowModal(!showModal)}>Add item</PrimaryButton>
      <Modal itemService={itemService} show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default ItemsListContainer;
