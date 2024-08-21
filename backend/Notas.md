ESTRUCTURA DE LA RESPUESTA DEL SERVIDOR:

JSON -> {
            resultado: {
                // DATOS
            }
        } 

ESTADOS -> 
    GET(TRUE): 302,
    GET(FALSE): 404,
    POST(TRUE): 201,
    PATH/DELETE(TRUE): 200,
    ENTRY_ERROR: 400,
    SERVICES_ERROR: 500

EJEMPLOS RECURSOS PARA URLS:

(*) => CAMPO OBLIGATORIO
(D) => TABLA QUE TIENE EL CAMPO "disabled" INCORPORADO PARA UN BORRADO LÓGICO (VALOR DEFAULT = FALSE)
// TODAS LAS TABLAS PRINCIPALES TIENEN INCLUIDO EL CAMPO DE "createdAT" y "updatedAT"






----- /stock -----

---- EXAMPLE /stock/create ---- (D)


REQUEST: {
            *name_material: STRING,
            description_material: TEXT,
            *amount_material: INTEGER,
            *measurement_material: STRING
        }

-----------------------------------------------------------------------------

----- /suppliers -----

=> POST ----- /suppliers/supplierMaterials/create ----- (D)

REQUEST: {
  "id_material": INT,
  "id_supplier": INT,
  "amount_material": INT,
  "price_material": FLOAT
}

-----------------------------------------------------------------------------

----- /purchase -----

=> POST ---- /purchase ----

REQUEST: {
  "purchase": [
    {"id_supplier_material": INT, "unit_material": INT},
    {"id_supplier_material": INT, "unit_material": INT}
    ]
}

