import request from  'supertest';

import app from '../../src/app';

describe('movements', () => {
  it('should be able to register a movement', async () => {
    const container = await request(app)
      .post('/containers')
      .send({
        cliente: 'Davilson Junior',
        numero_container: 'TEST1234567',
        tipo: '20',
        status: 'Cheio',
        categoria: 'Importação',
      })

      const response = await request(app)
      .post('/movements')
      .send({
        tipo_de_movimentacao: 'Embarque',
        data_inicio: '2022-04-12T10:00:00-00:00',
        id_container: container.body.id
      })

    expect(response.body).toHaveProperty('id');
    expect(response.status).toBe(201);
  })

  it('should be able to list all data', async () => {
      const movements = await request(app)
      .get('/movements')

    expect(movements.body[0]).toHaveProperty('id');
  })
})
