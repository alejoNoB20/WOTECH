import * as chai from 'chai'
import supertest from 'supertest'
import { app, server } from '../src/app.js';
import { StockService } from '../src/Components/Stock/stockService.js';
import { supplierService } from '../src/Components/Suppliers/suppliersService.js';
import { supplierMaterialsService } from '../src/Components/SupplierMaterials/suppliersMaterialsService.js';
import { clearDB } from '../src/database/connection.js';
const Stock = new StockService();
const Supplier = new supplierService();
const SupplierMaterial = new supplierMaterialsService();

const expect = chai.expect
const requester = supertest(app);

describe('Purchase Tests', function() {

    before(async () => {
        await clearDB();

        const stockMock = {
            "name_material": "Madera de pino",
            "measurement_material": "cm"
        };
        const supplierMock = {
            "name_company_supplier": "The Coca-Cola Company",
            "tax_address_supplier": "Amancio Avenida 3570",
            "number_phone_company_supplier": "341 814-8453"
        };
        const supplierMaterialMock = {
            "id_material_fk": 1,
            "id_supplier_fk": 1,
            "amount_material": 500,
            "price_material": 7000
        };

        await Stock.crearStock(stockMock);
        await Supplier.crearProveedor(supplierMock);
        await SupplierMaterial.crearMaterial(supplierMaterialMock);
    });

    after(async () => {
        server.close(() => console.log('El server cerró correctamente'));
    });

    it('EP: /purchase should register a new purchase into the DB', async () => {
        const purchaseMock = {
            "purchase": [{
                "id_supplier_material": 1,
                "unit_material": 3
            }]
        };
        const response = await requester.post('/purchase').send(purchaseMock)
        
        expect(response.status).to.be.equal(201)
    });
});
