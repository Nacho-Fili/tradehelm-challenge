const {Client} = require("pg");

class UserRepository {
  constructor() {
    this.connection = new Client({
      connectionString:
        process.env.DATABASE_URL ||
        "postgres://postgres:brillitos00@localhost:5432/tradehelm_challenge",
      ssl: {
        rejectUnauthorized: false,
      },
    });

    this.connection.connect().catch((err) => {
      throw err;
    });
  }

  idIsValid = function (id) {
    const queryText = 'SELECT id FROM "user" WHERE id=$1';
    const params = [id];

    return this.connection.query(queryText, params).then(({rows}) => !rows.length);
  };

  createUser = function (id) {
    const queryText = 'INSERT INTO "user" (id) VALUES ($1)';
    const params = [id];

    this.connection.query(queryText, params);
  };
}

module.exports = UserRepository;
