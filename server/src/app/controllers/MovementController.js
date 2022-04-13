import * as Yup from 'yup';
import { Op } from 'sequelize';
import { startOfHour, parseISO, isBefore } from 'date-fns';

import Movement from '../models/Movement';
import Container from '../models/Container';

class MovementContoller {
  async show(req, res) {
    const movements = await Movement.findAll({ limit: 5, order:[['createdAt', 'desc']] });

    return res.status(201).json(movements);
  }

  async index(req, res) {
    const {
      filter = '',
      search = '',
      startDate = '',
      endDate = ''
  } = req.query;

    let where = {};

    if (filter !== '' && filter === 'tipo_de_movimentacao' && search !== '') {
      const bus = { [Op.iLike]: `%${search}%` }
      where = { tipo_de_movimentacao: bus };
    }

    if (filter === 'data' && filter !== '' && startDate !== '' && endDate !== '') {
      where = { 'data_inicio': {[Op.between] : [startDate , endDate ]}};
    }

    const movements = await Movement.findAll({
      where,
      include: [
        {
          model: Container,
          as: 'container',
          attributes: ['id', 'cliente']
        }
      ],
      order: [['createdAt', 'desc']],
    });

    return res.status(201).json(movements);
  }

  async create(req, res) {
    const schema = Yup.object().shape({
      tipo_de_movimentacao: Yup.string().required(),
      data_inicio:  Yup.date().required(),
      id_container:  Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Faha na validação dos dados' })
    }

    const { id_container, data_inicio }  = req.body;

    const container = await Container.findOne({ where: { id: id_container } })

    if (!container) {
      return res.status(401).json({ error: 'Não existe nenhum container cadastrado!' })
    }

    /**
     * check for past dates
     */

    const hourInitial = startOfHour(parseISO(data_inicio));

    if (isBefore(hourInitial, new Date())) {
      return res.status(400).json({ error: 'Horas no passado não são permitidas' });
    }

    const movement = await Movement.create(req.body);

    return res.status(201).json(movement);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      tipo_de_movimentacao: Yup.string(),
      data_fim:  Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' })
    }

    const { id } = req.params;

    await Movement.update(req.body, {
      where: { id }
    });

    return res.status(201).json({ data: 'Movimentação atualizada com sucesso!' });
  }

  async delete(req, res) {
    const { id } = req.params;

    await Movement.destroy(req.body, {
      where: { id }
    });

    return res.status(201).json({ data: 'Movimentação removida com sucesso!' });
  }
}

export default new MovementContoller();
