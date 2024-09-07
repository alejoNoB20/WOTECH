import * as chai from 'chai'
import supertest from 'supertest'
import dotenv from 'dotenv'

dotenv.config()

const expect = chai.expect
const requester = supertest(`http://localhost:${process.env.PORT}/purchase`);

describe('Purchase Tests', function() {
    it('EP: / should register a new purchase into the DB', async () => {
        const purchaseMock = [
            {
                id_supplier_material: 1,
                unit_material: 3
            }
        ];
        const response = await requester.post('/').send(purchaseMock)
        expect(response.status).to.be.equal(201)
    })
})
