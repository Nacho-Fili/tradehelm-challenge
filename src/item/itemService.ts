import React from "react";
import io from "socket.io-client";

import Item from "./types";

const ENDPOINT = process.env.ENDPOINT || "";

export default class ItemService {
  socket = io(ENDPOINT, {transports: ["websocket", "polling", "flashsocket"]});

  setSetter = function (
    this: ItemService,
    setItems: React.Dispatch<React.SetStateAction<Item[]>>,
  ): void {
    this.socket.on("items", (items) => {
      setItems(items);
    });
  };

  fetchAll = function (this: ItemService): void {
    this.socket.emit("get items");
  };

  create = function (this: ItemService, name: string): void {
    const item: Item = {id: +new Date(), name: name};

    this.socket.emit("add item", item);
  };

  remove = function (this: ItemService, id: number): void {
    this.socket.emit("delete item", id);
  };
}
