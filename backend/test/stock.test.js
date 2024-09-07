import * as chai from 'chai';
import supertest from 'supertest';
import dotenv from 'dotenv';
import { clearDB, updateDB } from '../src/database/connection.js';

dotenv.config();

const expect = chai.expect;
const requester = supertest(`${process.env.DB_SERVER_URL}`);

describe('Stock Tests', () => {

    before(async () => {
        clearDB();
    });

    describe('Ver stock', () => {
        // it('EP: /stock/ Debería retornar una lista con los clientes con status 200', async () => {
        //     const response = await requester.get('/stock');
        //     expect(response.status).to.be.equal(200);
        // });
        it('EP: /stock/ En caso de no existir ningún cliente en la db, debería retornar "No se encontró ningún stock en la base de datos" con status 404', async () => {
            const response = await requester.get('/stock');
            expect(response.status).to.be.equal(404);
        });
    });

    describe('Crear stock', () => {
        it('EP: /stock/create Debería crear un nuevo stock en la db y devolver un status 201', async () => {
            const stockMock = {
                "id_material": "Madera de pino",
                "measurement_material": "Cm"
            }
            const response = await requester.post('/stock/create').send(stockMock);
            console.log(response)
            expect(response.status).to.be.equal(201);
        })
    })

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
