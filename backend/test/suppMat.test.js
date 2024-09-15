import * as chai from 'chai'
import supertest from 'supertest'
import { app, server } from '../src/app.js';
import { StockService } from '../src/Components/Stock/stockService.js';
import { supplierService } from '../src/Components/Suppliers/suppliersService.js';
import { clearDB } from '../src/database/connection.js';
const Stock = new StockService();
const Supplier = new supplierService();

const expect = chai.expect
const requester = supertest(app);

describe('Suppliers Materials Tests', function() {

    before(async ()=> {
        await clearDB()

        const stockMock = {
            "name_material": "Madera de pino",
            "measurement_material": "cm"
        };
        const supplierMock = {
            "name_company_supplier": "The Coca-Cola Company",
            "tax_address_supplier": "Amancio Avenida 3570",
            "number_phone_company_supplier": "341 814-8453"
        };

        await Stock.crearStock(stockMock);
        await Supplier.crearProveedor(supplierMock);
    });

    after(async ()=> {
        server.close(()=> console.log('El servidor se ha cerrado'));
    })

    describe('GET: Ver material asociados (sin registros)', () => {
        it('EP: /suppliers/supplierMaterials/:id_supplier En caso de no existir ningun material asociado en la db, debería retornar un status 404', async () => {
            const response = await requester.get('/suppliers/supplierMaterials/:1');

            expect(response.status).to.be.equal(404);
            expect(response.body).to.be.equal('Este proveedor aún no tiene materiales asociados');
        });
    });

    describe('POST: Crear material asociado (success)', () => {
        it('EP: /suppliers/supplierMaterials/create Debería crear un nuevo material asociado en la db y devolver un status 201', async () => {
            const supplierMaterialMock = {
                "id_material_fk": 1,
                "id_supplier_fk": 1,
                "amount_material": 500,
                "price_material": 7000
            };

            const Response = await requester.post('/suppliers/supplierMaterials/create').send(supplierMaterialMock);

            expect(Response.status).to.be.equal(201);
            expect(Response.body).to.be.equal('La creación del material de proveedor finalizó exitosamente');
        })
    });

    describe('GET: Ver materiales asociados (con registros)', () => {
        it('EP: /suppliers/supplierMaterials/:id_supplier_material Luego de haber creado un material asociado debería retornar una lista de herramientas con status 200', async () => {
            const response = await requester.get('/suppliers/supplierMaterials/1');

            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body[0].name_material).to.be.equal('Madera de pino');
        });        
    });

    describe('PATCH: Actualizar un material asociado (success)', () => {
        it('EP: /suppliers/supplierMaterials/update/:id_supplier_material Debería actualizar un material asociado y devolver un status 200', async () => {
            const newSupplierMaterialMock = {
                "id_material_fk": 1,
                "id_supplier_fk": 1,
                "amount_material": 600,
                "price_material": 2000
            };
            const response = await requester.patch('/suppliers/supplierMaterials/update/1').send(newSupplierMaterialMock);

            expect(response.status).to.be.equals(200);
            expect(response.body).to.be.equal('La actualización del material de proveedor finalizó exitosamente');
        });
    });

    describe('PATCH: Eliminado lógico de un material asociado', () => {
        it('EP: /suppliers/supplierMaterials/disabled/:id_supplier_material Debería realizar un eliminado lógico de un material asociado y devolver un status 200', async () => {
            const response = await requester.patch('/suppliers/supplierMaterials/disabled/1');

            expect(response.status).to.be.equals(200);
            expect(response.body).to.be.equal('La deshabilitación del material de proveedor finalizó exitosamente');
        });
    });

    describe('GET: Ver control de precios (con registros)', () => {
        it('EP: /suppliers/supplierMaterials/priceControl/:id_supplier_material Luego de haber realizado un cambio de precio a un material asociado debería retornar una lista de precios con status 200', async () => {
            const response = await requester.get('/suppliers/supplierMaterials/priceControl/1');

            expect(response.status).to.be.equal(200);
            expect(response.body).to.be.an('array');
            expect(response.body[0].register_price_control).to.be.equal(7000);
        });        
    });
});
