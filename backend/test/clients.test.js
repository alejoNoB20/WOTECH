import * as chai from 'chai';
import supertest from 'supertest';
import { clearDB } from '../src/database/connection.js'
import { app, server } from '../src/app.js';

const expect = chai.expect;
const requester = supertest(app);

describe('Clients Tests', function(){

    before(async () => {
        await clearDB();
    });

    after(async () => {
        server.close(() => console.log('El server cerró correctamente'));
    })

    describe('Get clients', () => {
        it('EP: /clients/ should return the list of clients.', async () => {
            const response = await requester.get('/clients/');
            expect(response.status).to.be.equal(404);
        });
    });

    describe('Creates a new client on the DB', () => {
        const userMock = {
            "name_client": "John",
            "last_name_client": "Travolta",
            "dni_client": "38159467",
            "province_client": "Buenos Aires",
            "direction_client": "Calle 123",
            "phone_number_client": "84 153-4865",
            "type_client": "Consumidor Final"
        };
        it('EP: /clients/create should create a client and return status 201', async () => {
            const response = await requester.post('/clients/create').send(userMock);
            expect(response.status).to.be.equal(201);
        });
    });

    describe('Get clients', () => {
        it('EP: /clients/ should return the list of clients.', async () => {
            const response = await requester.get('/clients/');
            expect(response.status).to.be.equal(200);
        });
    });

    describe('Get one or more clients with the requested parameters', () => {
        it('EP: /clients/search', async () => {
            const response = await requester.get('/clients/search?search_type=name_client&search_value=John')
            expect(response.status).to.be.equal(200)
        })
    })


    describe('Logical Delete of a client', () => {
        it('EP: /clients/disabled/:dni_client should set the "disabled" field to 1', async () => {
            const response = await requester.patch('/clients/disabled/1')
            expect(response.status).to.be.equal(200)
        });
    });
    
    describe('Update a client', () => {
        it('EP: /clients/update/:dni_client should update one or more fields of the client (PATCH)', async () => {
            const userMock = {
                "name_client": "Sara",
                "last_name_client": "Connor",
                "dni_client": "38159467",
                "province_client": "Buenos Aires",
                "direction_client": "Calle 123",
                "phone_number_client": "84 153-4865",
                "type_client": "Consumidor Final"
            };
            const response = await requester.patch('/clients/update/1').send(userMock)
            
            expect(response.status).to.be.equal(200)
        })
    });
});
