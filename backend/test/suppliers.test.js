// import * as chai from 'chai';
// import supertest from 'supertest';
// import dotenv from 'dotenv';

// dotenv.config();

// const expect = chai.expect;
// const requester = supertest(`${process.env.DB_SERVER_URL}`);

// describe('Suppliers Tests', () => {

//     describe('Ver proveedores', () => {
//         it('EP: /suppliers/ En caso de no existir ningun proveedor en la db, debería retornar un status 404', async () => {
//             const response = await requester.get('/suppliers');
//             expect(response.status).to.be.equal(404);
//         });
//     });

//     describe('Crear proveedores', () => {
//         it('EP: /suppliers/create Debería crear un nuevo proveedor en la db y devolver un status 201', async () => {
//             const supplierMock = {
//                 "name_company_supplier": "The Coca-Cola Company",
//                 "tax_address_supplier": "Amancio Avenida 3570",
//                 "number_phone_company_supplier": "341 814-8453"
//             }
//             const response = await requester.post('/suppliers/create').send(supplierMock);
//             expect(response.status).to.be.equal(201);
//         })
//     });

//     describe('Ver proveedores', () => {
//         it('EP: /suppliers/ Luego de haber creado un proveedor debería retornar una lista con los proveedores con un status 200', async () => {
//             const response = await requester.get('/suppliers');
//             expect(response.status).to.be.equal(200);
//         });        
//     });

//     describe('Ver detalladamente un proveedor', () => {
//         it('EP: /suppliers/details/:id_supplier Debería mostrar los detalles de un proveedir y devolver un status 200', async () => {
//             const response = await requester.get('/suppliers/details/1');
//             expect(response.status).to.be.equals(200);
//         });
//     });

//     describe('Actualizar un proveedor', () => {
//         it('EP: /suppliers/update/:id_supplier Debería actualizar un proveedor y devolver un status 200', async () => {
//             const newSupplierModal = {
//                 "name_company_supplier": "The Coca-Cola Company",
//                 "description_supplier": "Vende unas bebidas riquisimas",
//                 "tax_address_supplier": "Amancio Avenida 3570",
//                 "number_phone_company_supplier": "341 814-8453"
//             }
//             const response = await requester.patch('/suppliers/update/1').send(newSupplierModal);
//             expect(response.status).to.be.equals(200);
//         });
//     });

//     describe('Eliminado lógico de un proveedor', () => {
//         it('EP: /suppliers/disabled/:id_supplier Debería realizar un eliminado lógico de un proveedor y devolver un status 200', async () => {
//             const response = await requester.patch('/suppliers/disabled/1');
//             expect(response.status).to.be.equals(200);
//         });
//     });

//     describe('Eliminado total de un proveedor', () => {
//         it('EP: /suppliers/delete/:id_supplier Debería realizar un eliminado total de un proveedor y devolver un status 200', async () => {
//             const response = await requester.delete('/suppliers/delete/1');
//             expect(response.status).to.be.equals(200);
//         });
//     });
    
// });
