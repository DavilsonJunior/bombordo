import request from  'supertest';

import app from '../../src/app';

describe('container', () => {
  it('should be able to register a container', async () => {
    const response = await request(app)
      .post('/containers')
      .send({
        cliente: 'Davilson Junior',
        numero_container: 'TEST1234567',
        tipo: '20',
        status: 'Cheio',
        categoria: 'Importação',
      })
    expect(response.body).toHaveProperty('id');
  })

  it('should be able to list all data', async () => {
    await request(app)
      .post('/containers')
      .send({
        cliente: 'Davilson Junior',
        numero_container: 'TEST1234567',
        tipo: '20',
        status: 'Cheio',
        categoria: 'Importação',
      })
      const containers = await request(app)
      .get('/containers')

    expect(containers.body[0]).toHaveProperty('id');
  })
})
