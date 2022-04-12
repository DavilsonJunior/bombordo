import { Model, Sequelize } from 'sequelize';

class Container extends Model {
  static init(sequelize) {
   super.init({
    cliente: Sequelize.STRING,
    numero_container:Sequelize.STRING,
    tipo: Sequelize.STRING,
    status: Sequelize.STRING,
    categoria: Sequelize.STRING,
   },
   {
     sequelize
   }
   );

   return this;
  }
}

export default Container;
