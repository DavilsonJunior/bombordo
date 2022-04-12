

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('containers', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cliente: {
        type: Sequelize.STRING,
        allowNull: false
      },
      numero_container: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      categoria: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
     });
  },

  async down (queryInterface) {
     await queryInterface.dropTable('containers');
  }
};
