const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeAll( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll( async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name : "APAD 2",
            email : "contato@pad.org.br",
            whatsapp : "1132345412",
            city: "São Paulo",
            uf: "SP"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
})