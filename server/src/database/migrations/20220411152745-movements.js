module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('movements', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      tipo_de_movimentacao: {
        type: Sequelize.STRING,
        allowNull: false
      },
      data_inicio: {
        type: Sequelize.DATE,
        allowNull: false
      },
      data_fim: {
        type: Sequelize.DATE,
        allowNull: true
      },
      id_container: {
        type: Sequelize.INTEGER,
        refereces: { model: 'containers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
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
     await queryInterface.dropTable('movements');
  }
};
