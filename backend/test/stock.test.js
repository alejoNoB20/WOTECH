import * as chai from 'chai';
import supertest from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

const expect = chai.expect;
const requester = supertest(`${process.env.DB_SERVER_URL}`);

describe('Stock Tests', () => {

    describe('Ver stock', () => {
        it('EP: /stock/ Debería retornar una lista con los clientes con status 200', async () => {
            const response = await requester.get('/stock');
            expect(response.status).to.be.equal(200);
        });
        it('EP: /stock/ En caso de no existir ningún cliente en la db, debería retornar "No se encontró ningún stock en la base de datos" con status 404', async () => {
            const response = await requester.get('/stock');
            expect(response.status).to.be.equal(404);
        });
    });

    // describe('Get one or more clients with the requested parameters', () => {
    //     it('EP: /clients/search', async () => {
    //         const response = await requester.get('/clients/search?search_type=name_client&search_value=test')
    //         expect(response.status).to.be.equal(200)
    //     })
    // })

    // describe('Creates a new client on the DB', () => {
    //     const userMock = {
    //         mail_client: 'test2@gmail.com',
    //         name_client: 'test2',
    //         last_name_client: 'test2',
    //         dni_client: '12345678',
    //         province_client: 'Catamarca',
    //         direction_client: 'Calle test 1232',
    //         phone_number_client: '03415432',
    //         type_client: 'Consumidor Final',
    //         cuil_or_cuit_client: '12123456781'
    //     };
    //     //BEFORE RUNNING THIS TEST BE SURE THAT CLIENT INFORMATION DOESN'T EXISTS ON THE DB
    //     it('EP: /clients/create should create a client and return status 201', async () => {
    //         const response = await requester.post('/clients/create').send(userMock);
    //         expect(response.status).to.be.equal(201);
    //     })
});
