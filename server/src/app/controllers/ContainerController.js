import * as Yup from 'yup';
import { Op } from 'sequelize';

import Container from '../models/Container';

class ContainerController {
  async show(req, res) {
    const container = await Container.findAll({ limit: 5, order:[['createdAt', 'desc']] });

    return res.status(201).json(container);
  }

  async index(req, res) {
    const { filter = '', search = '' } = req.query;
    let where = {};

    if (filter !== '' && search !== '') {
      const bus = { [Op.iLike]: `%${search}%` }
      switch (filter) {
        case 'cliente':
          where = { cliente: bus };
          break;
        case 'numero_container':
          where = { numero_container: bus };
          break;
        case 'tipo':
          where = { tipo: bus };
          break;
        case 'status':
          where = { status: bus };
          break;
        case 'categoria':
          where = { categoria: bus };
          break;
        default:
          where = {};
          break;
      }
    }



    const containers = await Container.findAll({ where, raw: true, order:[['createdAt', 'desc']] });

    return res.status(201).json(containers);
  }

  async create(req, res) {
    const schema = Yup.object().shape({
      cliente: Yup.string().required(),
      numero_container:  Yup.string().required(),
      tipo:  Yup.string().required(),
      status:  Yup.string().required(),
      categoria:  Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' })
    }

    const { numero_container } = req.body

    const containerExist = await Container.findOne({
      where: { numero_container }
    });

    if (containerExist) {
      return res.status(401).json({ error: 'Esse container já está cadastrado! tente um novo' })
    }

    const container = await Container.create(req.body);

    return res.status(201).json(container);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      cliente: Yup.string(),
      numero_container:  Yup.string(),
      tipo:  Yup.string(),
      status:  Yup.string(),
      categoria:  Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' })
    }

    const { id } = req.params;

    await Container.update(req.body, {
      where: { id }
    });

    return res.status(201).json({ data: 'Container atualizado com sucesso!' });
  }

  async delete(req, res) {
    const { id } = req.params;

    await Container.destroy({
      where: { id }
    });

    return res.status(201).json({ data: 'Container removido com sucesso!' });
  }
}

export default new ContainerController();
