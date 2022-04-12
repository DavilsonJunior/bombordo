import Sequelize from 'sequelize';

import Container from '../app/models/Container';
import Movement from '../app/models/Movement';

import databaseConfig from '../config/database';

const models = [
  Container,
  Movement
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
