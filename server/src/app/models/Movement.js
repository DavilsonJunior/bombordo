import { Model, Sequelize } from 'sequelize';

class Movement extends Model {
  static init(sequelize) {
   super.init({
    tipo_de_movimentacao: Sequelize.STRING,
    data_inicio:Sequelize.DATE,
    data_fim: Sequelize.DATE,
    id_container: Sequelize.INTEGER,
   },
   {
     sequelize
   }
   );

   return this;
  }

  static associate(models) {
    this.belongsTo(models.Container, { foreignKey: 'id_container', as: 'container'  })
  }
}

export default Movement;
