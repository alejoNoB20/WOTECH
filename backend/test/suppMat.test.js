import * as chai from 'chai'
import supertest from 'supertest'
import dotenv from 'dotenv'

dotenv.config()

const expect = chai.expect
const requester = supertest(`http://localhost:${process.env.PORT}`);

describe('Suppliers Materials Tests', function() {

})

