// import * as chai from 'chai'
// import supertest from 'supertest'
// import dotenv from 'dotenv'

// dotenv.config()

// const expect = chai.expect
// const requester = supertest(`http://localhost:${process.env.PORT}/suppliers/invoices`);

// describe('Invoices Tests', function() {
//     describe('Get /:id_supplier', () => {
//         it('EP: /id_supplier should return all the bills asociated with a supplier', async () => {
//             const response = await requester.get('/2')
//             console.log(response);
            
//             expect(response.status).to.be.equal(200)
//         })
//     })

//     describe('Post /push', () => {
//         it('EP: /push ', async () => {
//             const invoiceMock = {
//                 id_supplier: 2,
//                 invoice: "test"
//             }
//             const response = await requester.post('/push').send(invoiceMock)

//             expect(response.status).to.be.equal(201)
//         })
//     })

//     describe('Patch /disabled/:id_invoice', () => {
//         it('EP: /disabled/:id_invoice should set a bill as disabled', async () => {
//             const response = await requester.patch('/disabled/1')
//             expect(response.status).to.be.equal(200)
//         })
//     })
// })





