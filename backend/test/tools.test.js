import * as chai from 'chai';
import supertest from 'supertest';
import app from '../src/app.js';

const expect = chai.expect;
const requester = supertest(app);

describe('Tools Tests', () => {

    describe('Ver herramientas', () => {
        it('EP: /tools/ En caso de no existir ninguna herramienta en la db, debería retornar un status 404', async () => {
            const response = await requester.get('/tools');
            expect(response.status).to.be.equal(404);
        });
    });

    describe('Crear herramientas', () => {
        it('EP: /tools/create Debería crear un nueva herramienta en la db y devolver un status 201', async () => {
            const toolMock = {
                "name_tool": "Martillo",
                "location_tool": "Mueble 1",
            }
            const response = await requester.post('/tools/create').send(toolMock);
            expect(response.status).to.be.equal(201);
        })
    });

    describe('Ver herramientas', () => {
        it('EP: /tools/ Luego de haber creado una herramienta debería retornar una lista con las herramientas con status 200', async () => {
            const response = await requester.get('/tools');
            expect(response.status).to.be.equal(200);
        });        
    });

    describe('Ver detalladamente una herramienta', () => {
        it('EP: /tools/details/:id_tool Debería mostrar los detalles de una herramienta y devolver un status 200', async () => {
            const response = await requester.get('/tools/details/1');
            expect(response.status).to.be.equals(200);
        });
    });

    describe('Actualizar una herramienta', () => {
        it('EP: /tools/update/:id_tool Debería actualizar una herramienta y devolver un status 200', async () => {
            const newToolModal = {
                "name_tool": "Martillo",
                "location_tool": "Mueble 1",
                "status_tool": "Perdido"
            }
            const response = await requester.patch('/tools/update/1').send(newToolModal);
            expect(response.status).to.be.equals(200);
        });
    });

    describe('Eliminado lógico de una herramienta', () => {
        it('EP: /tool/disabled/:id_tool Debería realizar un eliminado lógico de una herramienta y devolver un status 200', async () => {
            const response = await requester.patch('/tools/disabled/1');
            expect(response.status).to.be.equals(200);
        });
    });

    describe('Eliminado total de una herramienta', () => {
        it('EP: /tool/delete/:id_tool Debería realizar un eliminado total de una herramienta y devolver un status 200', async () => {
            const response = await requester.delete('/tools/delete/1');
            expect(response.status).to.be.equals(200);
        });
    });
    
});