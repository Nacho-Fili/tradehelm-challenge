import React from "react";

import ItemsListContainer from "../item/ItemsListContainer";
import ItemService from "../item/itemService";

import styles from "./App.module.scss";

import "./App.css";

const App: React.FC = () => {
  const itemService = new ItemService();

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Supermarket List</h1>
      </header>
      <ItemsListContainer itemService={itemService} />
    </main>
  );
};

export default App;
