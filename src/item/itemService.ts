import React from "react";
import io from "socket.io-client";

import User from "../user/types";

import Item from "./types";

const ENDPOINT = process.env.REACT_APP_ENDPOINT || "";

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

  fetchAll = function (this: ItemService, {id}: User): void {
    this.socket.emit("get items", {userId: id});
  };

  create = function (this: ItemService, name: string, {id}: User): void {
    const item: Item = {description: name};

    this.socket.emit("add item", {item, userId: id});
  };

  remove = function (this: ItemService, item: Item, {id}: User): void {
    if (!item.id) return;
    this.socket.emit("delete item", {itemId: item.id, userId: id});
  };
}
