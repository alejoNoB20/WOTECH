import * as chai from 'chai';
import supertest from 'supertest';
import { app, server } from '../src/app.js';
import { clearDB } from '../src/database/connection.js';

const expect = chai.expect;
const requester = supertest(app);

describe('Tools Tests', () => {

    before(async () => {
        await clearDB();
    });

    after(async () => {
        server.close(() => console.log('El server cerró correctamente'));
    })

    describe('GET: Ver herramientas (sin registros)', () => {
        it('EP: /tool/ En caso de no existir ninguna herramienta en la db, debería retornar un status 404', async () => {
            const response = await requester.get('/tools');

            expect(response.status).to.be.equal(404);
            expect(response.body).to.be.equal('No se encontraron herramientas registradas en la base de datos');
        });
    });

    describe('POST: Crear herramienta (success)', () => {
        it('EP: /tools/create Debería crear una nueva herramienta en la db y devolver un status 201', async () => {
            const firstToolMock = {
                "name_tool": "Martillo",
                "location_tool": "Mueble 1"
            };
            const secondToolMock = {
                "name_tool": "Moladora",
                "location_tool": "Cajon 3"             
            };

            const firstResponse = await requester.post('/tools/create').send(firstToolMock);
            const secondResponse = await requester.post('/tools/create').send(secondToolMock);

            expect(firstResponse.status).to.be.equal(201);
            expect(firstResponse.body).to.be.equal('La creación de la herramienta finalizó exitosmente');
            expect(secondResponse.status).to.be.equal(201);
            expect(secondResponse.body).to.be.equal('La creación de la herramienta finalizó exitosmente');
        })
    });

    describe('POST: Crear herramienta (fail)', () => {
        it('EP: /tools/create Debería crear una nueva herramienta con el mismo nombre de uno ya creado, por lo que va a devolver un status 400', async () => {
            const failToolMock = {
                "name_tool": "Martillo",
                "location_tool": "Mueble 1"
            };

            const failResponse = await requester.post('/tools/create').send(failToolMock);

            expect(failResponse.status).to.be.equal(400);
            expect(failResponse.body.errors[0].msg).to.be.equal('Ya se encuentra una herramienta registrada con el mismo nombre');
        })
    });

    describe('GET: Ver herramientas (con registros)', () => {
        it('EP: /tools/ Luego de haber creado una herramienta debería retornar una lista de herramientas con status 200', async () => {
            const response = await requester.get('/tools');

            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body[0].name_tool).to.be.equal('Martillo');
        });        
    });

    describe('GET: Ver detalladamente una herramienta', () => {
        it('EP: /tools/details/:id_tool Debería mostrar los detalles de una herramienta y devolver un status 200', async () => {
            const response = await requester.get('/tools/details/1');

            expect(response.status).to.be.equals(200);
            expect(response.body[0].name_tool).to.be.equal('Martillo');
            expect(response.body[0]).to.have.property('products');
        });
    });

    describe('PATCH: Actualizar una herramienta (success)', () => {
        it('EP: /tools/update/:id_tool Debería actualizar una herramienta y devolver un status 200', async () => {
            const newToolModal = {
                "name_tool": "Martillo",
                "location_tool": "Mueble 1",
                "status_tool": "Inhabilitado"
            };
            const response = await requester.patch('/tools/update/1').send(newToolModal);

            expect(response.status).to.be.equals(200);
            expect(response.body).to.be.equal('La actualización de la herramienta finalizó exitosamente');
        });
    });

    describe('PATCH: Actualizar una herramienta (fail)', () => {
        it('EP: /tools/update/:id_tool Debería actualizar una herramienta, pero va a tener el mismo nombre que otra herramienta en la db por lo tanto devolver un status 400', async () => {
            const failToolModal = {
                "name_tool": "Moladora",
                "location_tool": "Mueble 1",
                "status_tool": "Inhabilitado"
            };
            const failResponse = await requester.patch('/tools/update/1').send(failToolModal);
            
            expect(failResponse.status).to.be.equal(400);
            expect(failResponse.body.errors[0].msg).to.be.equal('Ya se encuentra una herramienta registrada con el mismo nombre');
        });
    });    

    describe('PATCH: Eliminado lógico de una herramienta', () => {
        it('EP: /tools/disabled/:id_tool Debería realizar un eliminado lógico de una herramienta y devolver un status 200', async () => {
            const response = await requester.patch('/tools/disabled/1');

            expect(response.status).to.be.equals(200);
            expect(response.body).to.be.equal('La deshabilitación de la herramienta finalizó exitosamente');
        });
    });

    describe('DELETE: Eliminado total de una herramienta', () => {
        it('EP: /tools/delete/:id_tool Debería realizar un eliminado total de una herramienta y devolver un status 200', async () => {
            const response = await requester.delete('/tools/delete/1');

            expect(response.status).to.be.equals(200);
            expect(response.body).to.be.equal('La eliminación de la herramietna finalizó exitosamente');
        });
    });
});