class ItemRepository {
  constructor(connection) {
    this.connection = connection;
  }

  fetchAll = function (userId) {
    const queryText = "SELECT * FROM items WHERE user_id = $1";
    const params = [userId];

    return this.connection.query(queryText, params).then(({rows}) => {
      return rows;
    });
  };

  addItem = function (item, userId) {
    const queryText = "INSERT INTO items (description, user_id) VALUES ($1, $2) RETURNING *";
    const params = [item.description, userId];

    return this.connection
      .query(queryText, params)
      .then(({rows}) => (rows.length ? "success" : "error"));
  };

  deleteItem = function (itemId, userId) {
    const queryText = "DELETE FROM items WHERE id=$1 and user_id=$2";
    const params = [itemId, userId];

    return this.connection
      .query(queryText, params)
      .then(({rowCount}) => (rowCount ? "success" : "error"));
  };
}

module.exports = ItemRepository;
