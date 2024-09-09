import * as chai from 'chai';
import supertest from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

const expect = chai.expect;
const requester = supertest(`${process.env.DB_SERVER_URL}`);

describe('Stock Tests', () => {

    describe('Ver stock', () => {
        it('EP: /stock/ En caso de no existir ningun material en la db, debería retornar "No se encontró ningún stock en la base de datos" con status 404', async () => {
            const response = await requester.get('/stock');
            expect(response.status).to.be.equal(404);
        });
    });

    describe('Crear stock', () => {
        it('EP: /stock/create Debería crear un nuevo stock en la db y devolver un status 201', async () => {
            const stockMock = {
                "name_material": "Madera de pino",
                "measurement_material": "cm"
            }
            const response = await requester.post('/stock/create').send(stockMock);
            expect(response.status).to.be.equal(201);
        })
    });

    describe('Ver stock', () => {
        it('EP: /stock/ Luego de haber creado un material debería retornar una lista con materiales con status 200', async () => {
            const response = await requester.get('/stock');
            expect(response.status).to.be.equal(200);
        });        
    });

    describe('Ver detalladamente un stock', () => {
        it('EP: /stock/details/:id_material Debería mostrar los detalles de un material y devolver un status 200', async () => {
            const response = await requester.get('/stock/details/1');
            expect(response.status).to.be.equals(200);
        });
    });

    describe('Actualizar un stock', () => {
        it('EP: /stock/update/:id_material Debería actualizar un material y devolver un status 200', async () => {
            const newStockModal = {
                "name_material": "Madera de pino",
                "description_material": "Madera de pino comprada de Jorgito S.R.L",
                "measurement_material": "cm"
            }
            const response = await requester.patch('/stock/update/1').send(newStockModal);
            expect(response.status).to.be.equals(200);
        });
    });

    describe('Eliminado lógico de un stock', () => {
        it('EP: /stock/disabled/:id_material Debería realizar un eliminado lógico de un material y devolver un status 200', async () => {
            const response = await requester.patch('/stock/disabled/1');
            expect(response.status).to.be.equals(200);
        });
    });

    describe('Eliminado total de un stock', () => {
        it('EP: /stock/delete/:id_material Debería realizar un eliminado total de un material y devolver un status 200', async () => {
            const response = await requester.delete('/stock/delete/1');
            expect(response.status).to.be.equals(200);
        });
    });
    
});
