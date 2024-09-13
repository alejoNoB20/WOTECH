// import * as chai from 'chai'
// import supertest from 'supertest'
// import dotenv from 'dotenv'
// import { app, server } from '../src/app.js';
// import { clearDB } from '../src/database/connection.js';

// // dotenv.config()

// const expect = chai.expect
// const requester = supertest(app);

// describe('Purchase Tests', function() {

//     before(async () => {
//         await clearDB();
//     });

//     after(async () => {
//         server.close(() => console.log('El server cerró correctamente'));
//     })

//     it('EP: / should register a new purchase into the DB', async () => {
//         const purchaseMock = [
//             {
//                 id_supplier_material: 1,
//                 unit_material: 3
//             }
//         ];
//         const response = await requester.post('/').send(purchaseMock)
        
//         expect(response.status).to.be.equal(201)
//     })
// })
