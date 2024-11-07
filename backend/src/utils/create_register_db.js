import { clearDB } from "../database/connection.js";
import { Stock } from "../Components/Stock/stocksModels.js";
import { Tools } from "../Components/Tools/toolsModels.js";
import { Supplier } from "../Components/Suppliers/suppliersModels.js";
import { PriceControl } from "../Components/SupplierMaterials/priceControlModels.js";
import { supplierStockAssociations } from "../Components/SupplierMaterials/suppliersMaterialsModels.js";
import { Products } from "../Components/Products/productsModels.js";
import { Orders } from "../Components/Orders/ordersModels.js";
import { Invoices } from "../Components/Invoices/invoicesModels.js";
import { Clients } from "../Components/Clients/clientsModels.js";

// Funcion para cargar registro de pruebas predefinidos a la DB
export const createRegistersDB = async () => {
    // Primero limpiamos la DB para evitar cualquier tipo de error
try{
    await clearDB();

    await Stock.bulkCreate([
      {
        "name_material": "Madera Roble",
        "description_material": "Madera de roble de alta calidad, ideal para muebles.",
        "amount_material": 150,
        "measurement_material": "cm"
      },
      {
        "name_material": "Tornillos 5mm",
        "description_material": "Tornillos de acero inoxidable de 5mm.",
        "amount_material": 1000,
        "measurement_material": "unidad"
      },
      {
        "name_material": "Barniz Mate",
        "description_material": "Barniz de acabado mate para protección de maderas.",
        "amount_material": 50,
        "measurement_material": "cm"
      },
      {
        "name_material": "Pintura Blanca",
        "description_material": "Pintura blanca de alta cobertura.",
        "amount_material": 30,
        "measurement_material": "cm"
      },
      {
        "name_material": "Pegamento de Madera",
        "description_material": "Adhesivo fuerte para unir piezas de madera.",
        "amount_material": 20,
        "measurement_material": "unidad"
      },
      {
        "name_material": "Lija Grano Fino",
        "description_material": "Lija de grano fino para acabados suaves.",
        "amount_material": 200,
        "measurement_material": "unidad"
      },
      {
        "name_material": "Cera Natural",
        "description_material": "Cera para acabados de muebles de madera.",
        "amount_material": 15,
        "measurement_material": "cm"
      },
      {
        "name_material": "Clavos 2cm",
        "description_material": "Clavos de acero de 2cm para uso general.",
        "amount_material": 500,
        "measurement_material": "unidad"
      },
      {
        "name_material": "Bisagras de Latón",
        "description_material": "Bisagras pequeñas de latón para puertas de armarios.",
        "amount_material": 100,
        "measurement_material": "unidad"
      },
      {
        "name_material": "Listones de Pino",
        "description_material": "Listones de madera de pino de 2x4 cm.",
        "amount_material": 120,
        "measurement_material": "cm"
      }
    ]);

    await Tools.bulkCreate([
      {
        "name_tool": "Taladro",
        "description_tool": "Taladro eléctrico de alta potencia.",
        "img_tool": "https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png",
        "status_tool": "Habilitado",
        "location_tool": "Almacén A"
      },
      {
        "name_tool": "Sierra Circular",
        "description_tool": "Sierra circular para cortar madera.",
        "img_tool": "https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png",
        "status_tool": "En Arreglo",
        "location_tool": "Taller 2",
        "repair_shop_tool": "Servicio de Herramientas S.A.",
        "repair_date_tool": "2024-09-10",
        "search_repair_tool": "2024-09-15"
      },
      {
        "name_tool": "Lijadora",
        "description_tool": "Lijadora orbital para acabados suaves.",
        "img_tool": "https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png",
        "status_tool": "Inhabilitado",
        "location_tool": "Almacén B"
      },
      {
        "name_tool": "Sargento",
        "description_tool": "Sargento de sujeción para madera.",
        "img_tool": "https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png",
        "status_tool": "Habilitado",
        "location_tool": "Taller 1"
      },
      {
        "name_tool": "Cepillo Eléctrico",
        "description_tool": "Cepillo eléctrico para alisar superficies.",
        "img_tool": "https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png",
        "status_tool": "Perdido",
        "location_tool": "No disponible"
      },
      {
        "name_tool": "Cinta Métrica",
        "description_tool": "Cinta métrica de 5 metros.",
        "img_tool": "https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png",
        "status_tool": "Habilitado",
        "location_tool": "Almacén A"
      },
      {
        "name_tool": "Esmeriladora",
        "description_tool": "Esmeriladora para afilar herramientas.",
        "img_tool": "https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png",
        "status_tool": "En Arreglo",
        "location_tool": "Taller 3",
        "repair_shop_tool": "Reparaciones Industriales",
        "repair_date_tool": "2024-09-12",
        "search_repair_tool": "2024-09-20"
      },
      {
        "name_tool": "Juego de Brocas",
        "description_tool": "Juego completo de brocas de diferentes tamaños.",
        "img_tool": "https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png",
        "status_tool": "Habilitado",
        "location_tool": "Almacén C"
      },
      {
        "name_tool": "Alicate de Presión",
        "description_tool": "Alicate de presión ajustable.",
        "img_tool": "https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png",
        "status_tool": "Inhabilitado",
        "location_tool": "Taller 2"
      },
      {
        "name_tool": "Sierra de Mano",
        "description_tool": "Sierra manual para cortes precisos.",
        "img_tool": "https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png",
        "status_tool": "En Arreglo",
        "location_tool": "Taller 1",
        "repair_shop_tool": "Herramientas & Reparaciones",
        "repair_date_tool": "2024-09-05",
        "search_repair_tool": "2024-09-10"
      }
    ]);

    await Clients.bulkCreate([
      {
        "name_client": "Ana",
        "last_name_client": "Gómez",
        "dni_client": "12345678",
        "province_client": "Buenos Aires",
        "direction_client": "Av. Santa Fe 1234",
        "mail_client": "ana.gomez@example.com",
        "phone_number_client": "123456789",
        "type_client": "Consumidor Final",
        "cuil_or_cuit_client": "20-12345678-9"
      },
      {
        "name_client": "Luis",
        "last_name_client": "Fernández",
        "dni_client": "23456789",
        "province_client": "Córdoba",
        "direction_client": "Calle Falsa 567",
        "mail_client": "luis.fernandez@example.com",
        "phone_number_client": "987654321",
        "type_client": "Empresa",
        "cuil_or_cuit_client": "20-23456789-0"
      },
      {
        "name_client": "María",
        "last_name_client": "Rodríguez",
        "dni_client": "34567890",
        "province_client": "Santa Fe",
        "direction_client": "Ruta 11 Km 45",
        "mail_client": "maria.rodriguez@example.com",
        "phone_number_client": "456789123",
        "type_client": "Otro",
        "cuil_or_cuit_client": "20-34567890-1"
      },
      {
        "name_client": "Carlos",
        "last_name_client": "Martínez",
        "dni_client": "45678901",
        "province_client": "Mendoza",
        "direction_client": "Avenida Las Heras 234",
        "mail_client": "carlos.martinez@example.com",
        "phone_number_client": "321654987",
        "type_client": "Consumidor Final",
        "cuil_or_cuit_client": "20-45678901-2"
      },
      {
        "name_client": "Lucía",
        "last_name_client": "Pérez",
        "dni_client": "56789012",
        "province_client": "Chaco",
        "direction_client": "Calle Belgrano 876",
        "mail_client": "lucia.perez@example.com",
        "phone_number_client": "654987321",
        "type_client": "Empresa",
        "cuil_or_cuit_client": "20-56789012-3"
      },
      {
        "name_client": "Javier",
        "last_name_client": "Alonso",
        "dni_client": "67890123",
        "province_client": "Neuquén",
        "direction_client": "Calle 9 de Julio 123",
        "mail_client": "javier.alonso@example.com",
        "phone_number_client": "789123456",
        "type_client": "Otro",
        "cuil_or_cuit_client": "20-67890123-4"
      },
      {
        "name_client": "Gabriela",
        "last_name_client": "García",
        "dni_client": "78901234",
        "province_client": "Formosa",
        "direction_client": "Avenida San Martín 456",
        "mail_client": "gabriela.garcia@example.com",
        "phone_number_client": "987321654",
        "type_client": "Consumidor Final",
        "cuil_or_cuit_client": "20-78901234-5"
      },
      {
        "name_client": "Martín",
        "last_name_client": "Vázquez",
        "dni_client": "89012345",
        "province_client": "Salta",
        "direction_client": "Calle 25 de Mayo 789",
        "mail_client": "martin.vazquez@example.com",
        "phone_number_client": "321987654",
        "type_client": "Empresa",
        "cuil_or_cuit_client": "20-89012345-6"
      },
      {
        "name_client": "Sofía",
        "last_name_client": "Castro",
        "dni_client": "90123456",
        "province_client": "Tierra del Fuego",
        "direction_client": "Calle Rivadavia 234",
        "mail_client": "sofia.castro@example.com",
        "phone_number_client": "654321987",
        "type_client": "Otro",
        "cuil_or_cuit_client": "20-90123456-7"
      },
      {
        "name_client": "Felipe",
        "last_name_client": "Mora",
        "dni_client": "01234567",
        "province_client": "La Rioja",
        "direction_client": "Avenida Perón 567",
        "mail_client": "felipe.mora@example.com",
        "phone_number_client": "789456123",
        "type_client": "Consumidor Final",
        "cuil_or_cuit_client": "20-01234567-8"
      },
      {
        "name_client": "Valeria",
        "last_name_client": "Gutiérrez",
        "dni_client": "12345670",
        "province_client": "Jujuy",
        "direction_client": "Calle Belgrano 890",
        "mail_client": "valeria.gutierrez@example.com",
        "phone_number_client": "456123789",
        "type_client": "Empresa",
        "cuil_or_cuit_client": "20-12345670-9"
      }
    ]);

    await Supplier.bulkCreate([
      {
        "name_company_supplier": "Proveedores S.A.",
        "reason_social_supplier": "Proveedor de materiales de construcción",
        "cuit_company_supplier": "20-12345678-9",
        "description_supplier": "Distribuidor de materiales de construcción y herramientas.",
        "tax_address_supplier": "Calle Falsa 123",
        "number_phone_company_supplier": "123456789",
        "mail_company_supplier": "contacto@proveedorsa.com",
        "website_company_supplier": "www.proveedorsa.com",
        "distributor_name_supplier": "Juan Pérez",
        "number_phone_distributor_supplier": "987654321",
        "mail_distributor_supplier": "juan.perez@proveedorsa.com",
        "delivery_days_suppier": "Lunes a Viernes",
        "payment_method_supplier": "Transferencia"
      },
      {
        "name_company_supplier": "Herramientas y Más",
        "reason_social_supplier": "Suministros de herramientas y equipos",
        "cuit_company_supplier": "20-23456789-0",
        "description_supplier": "Especialistas en herramientas y equipos de trabajo.",
        "tax_address_supplier": "Avenida Libertador 456",
        "number_phone_company_supplier": "234567890",
        "mail_company_supplier": "info@herramientasymas.com",
        "website_company_supplier": "www.herramientasymas.com",
        "distributor_name_supplier": "Ana Gómez",
        "number_phone_distributor_supplier": "876543210",
        "mail_distributor_supplier": "ana.gomez@herramientasymas.com",
        "delivery_days_suppier": "Martes a Sábado",
        "payment_method_supplier": "Transferencia"
      },
      {
        "name_company_supplier": "Maderas del Sur",
        "reason_social_supplier": "Suministro de maderas y derivados",
        "cuit_company_supplier": "20-34567890-1",
        "description_supplier": "Proveedor de maderas y productos derivados.",
        "tax_address_supplier": "Calle San Martín 789",
        "number_phone_company_supplier": "345678901",
        "mail_company_supplier": "ventas@maderasdelsur.com",
        "website_company_supplier": "www.maderasdelsur.com",
        "delivery_days_suppier": "Lunes a Viernes",
        "payment_method_supplier": "Transferencia"
      },
      {
        "name_company_supplier": "Electrodomésticos SRL",
        "reason_social_supplier": "Venta de electrodomésticos y herramientas eléctricas",
        "cuit_company_supplier": "20-45678901-2",
        "description_supplier": "Proveedores de electrodomésticos y herramientas eléctricas.",
        "tax_address_supplier": "Avenida Rivadavia 1234",
        "number_phone_company_supplier": "456789012",
        "mail_company_supplier": "ventas@electrodomesticos.com",
        "website_company_supplier": "www.electrodomesticos.com",
        "delivery_days_suppier": "Lunes a Domingo",
        "payment_method_supplier": "Débito"
      },
      {
        "name_company_supplier": "Cemento y Construcción",
        "reason_social_supplier": "Suministro de cementos y materiales de construcción",
        "cuit_company_supplier": "20-56789012-3",
        "description_supplier": "Distribuidor de cementos y materiales para construcción.",
        "tax_address_supplier": "Calle Mendoza 567",
        "number_phone_company_supplier": "567890123",
        "mail_company_supplier": "contacto@cementoyconstruccion.com",
        "website_company_supplier": "www.cementoyconstruccion.com",
        "distributor_name_supplier": "Luis Fernández",
        "number_phone_distributor_supplier": "654321987",
        "mail_distributor_supplier": "luis.fernandez@cementoyconstruccion.com",
        "delivery_days_suppier": "Lunes a Viernes",
        "payment_method_supplier": "Transferencia"
      },
      {
        "name_company_supplier": "Ferretería El Martillo",
        "reason_social_supplier": "Venta de ferretería y accesorios",
        "cuit_company_supplier": "20-67890123-4",
        "description_supplier": "Proveedor de ferretería general y accesorios.",
        "tax_address_supplier": "Calle Independencia 345",
        "number_phone_company_supplier": "678901234",
        "mail_company_supplier": "info@ferreteriaelmartillo.com",
        "website_company_supplier": "www.ferreteriaelmartillo.com",
        "delivery_days_suppier": "Lunes a Sábado",
        "payment_method_supplier": "Transferencia"
      },
      {
        "name_company_supplier": "Líneas Eléctricas SA",
        "reason_social_supplier": "Materiales y accesorios eléctricos",
        "cuit_company_supplier": "20-78901234-5",
        "description_supplier": "Proveedores de cables, interruptores y accesorios eléctricos.",
        "tax_address_supplier": "Calle Córdoba 123",
        "number_phone_company_supplier": "789012345",
        "mail_company_supplier": "ventas@lineaselectricassa.com",
        "website_company_supplier": "www.lineaselectricassa.com",
        "distributor_name_supplier": "Gabriela Rodríguez",
        "number_phone_distributor_supplier": "321654987",
        "mail_distributor_supplier": "gabriela.rodriguez@lineaselectricassa.com",
        "delivery_days_suppier": "Lunes a Viernes",
        "payment_method_supplier": "Transferencia"
      },
      {
        "name_company_supplier": "Herramientas Rápidas",
        "reason_social_supplier": "Distribuidor de herramientas y maquinaria",
        "cuit_company_supplier": "20-89012345-6",
        "description_supplier": "Venta de herramientas y maquinaria para construcción.",
        "tax_address_supplier": "Calle 9 de Julio 678",
        "number_phone_company_supplier": "890123456",
        "mail_company_supplier": "contacto@herramientasrapidas.com",
        "website_company_supplier": "www.herramientasrapidas.com",
        "delivery_days_suppier": "Lunes a Domingo",
        "payment_method_supplier": "Crédito"
      },
      {
        "name_company_supplier": "Muebles y Más",
        "reason_social_supplier": "Suministro de muebles y accesorios",
        "cuit_company_supplier": "20-90123456-7",
        "description_supplier": "Proveedor de muebles y accesorios para el hogar.",
        "tax_address_supplier": "Calle Libertad 234",
        "number_phone_company_supplier": "901234567",
        "mail_company_supplier": "ventas@mueblesymas.com",
        "website_company_supplier": "www.mueblesymas.com",
        "distributor_name_supplier": "Martín Gómez",
        "number_phone_distributor_supplier": "654987321",
        "mail_distributor_supplier": "martin.gomez@mueblesymas.com",
        "delivery_days_suppier": "Martes a Domingo",
        "payment_method_supplier": "Transferencia"
      },
      {
        "name_company_supplier": "Accesorios Industriales",
        "reason_social_supplier": "Venta de accesorios industriales y maquinaria",
        "cuit_company_supplier": "20-01234567-8",
        "description_supplier": "Proveedores de maquinaria y accesorios industriales.",
        "tax_address_supplier": "Avenida San Martín 789",
        "number_phone_company_supplier": "012345678",
        "mail_company_supplier": "info@accesoriosindustriales.com",
        "website_company_supplier": "www.accesoriosindustriales.com",
        "delivery_days_suppier": "Lunes a Viernes",
        "payment_method_supplier": "Efectivo"
      },
      {
        "name_company_supplier": "Metales del Norte",
        "reason_social_supplier": "Suministro de metales y productos metálicos",
        "cuit_company_supplier": "20-12345670-9",
        "description_supplier": "Proveedor de metales y productos metálicos para industria.",
        "tax_address_supplier": "Calle Sarmiento 123",
        "number_phone_company_supplier": "123456789",
        "mail_company_supplier": "contacto@metalesdelnorte.com",
        "website_company_supplier": "www.metalesdelnorte.com",
        "distributor_name_supplier": "Sofía Martínez",
        "number_phone_distributor_supplier": "987654321",
        "mail_distributor_supplier": "sofia.martinez@metalesdelnorte.com",
        "delivery_days_suppier": "Lunes a Sábado",
        "payment_method_supplier": "Transferencia"
      }
    ]);

    // await Products.bulkCreate([
    //   {
    //     "name_product": "Mesa de Madera",
    //     "img_product": "https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png",
    //     "description_product": "Mesa de madera maciza con acabado en barniz.",
    //     "price_product": 5000,
    //     "map_product": "",
    //     "tools": [1, 2],
    //     "materials": [
    //       {
    //         "id": 1,
    //         "how_much_content": 10
    //       },
    //       {
    //         "id": 3,
    //         "how_much_content": 5
    //       }
    //     ]
    //   },
    //   {
    //     "name_product": "Silla de Oficina",
    //     "img_product": "https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png",
    //     "description_product": "Silla ergonómica con soporte lumbar y ruedas.",
    //     "price_product": 2500,
    //     "map_product": "",
    //     "tools": [3, 4],
    //     "materials": [
    //       {
    //         "id": 2,
    //         "how_much_content": 4
    //       }
    //     ]
    //   },
    //   {
    //     "name_product": "Estantería de Metal",
    //     "img_product": "https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png",
    //     "description_product": "Estantería metálica de 5 niveles con capacidad para 200kg.",
    //     "price_product": 3500,
    //     "map_product": "",
    //     "tools": [5],
    //     "materials": [
    //       {
    //         "id": 1,
    //         "how_much_content": 6
    //       }
    //     ]
    //   },
    //   {
    //     "name_product": "Armario de Oficina",
    //     "img_product": "https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png",
    //     "description_product": "Armario con puertas corredizas y estantes internos.",
    //     "price_product": 6000,
    //     "map_product": "",
    //     "tools": [6],
    //     "materials": [
    //       {
    //         "id": 2,
    //         "how_much_content": 8
    //       },
    //       {
    //         "id": 4,
    //         "how_much_content": 4
    //       }
    //     ]
    //   },
    //   {
    //     "name_product": "Sofá de Cuero",
    //     "img_product": "https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png",
    //     "description_product": "Sofá de 3 plazas en cuero con relleno de espuma.",
    //     "price_product": 8000,
    //     "map_product": "",
    //     "tools": [7],
    //     "materials": [
    //       {
    //         "id": 1,
    //         "how_much_content": 12
    //       }
    //     ]
    //   },
    //   {
    //     "name_product": "Mesita de Noche",
    //     "img_product": "https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png",
    //     "description_product": "Mesita de noche con un cajón y estante inferior.",
    //     "price_product": 1200,
    //     "map_product": "",
    //     "tools": [8],
    //     "materials": [
    //       {
    //         "id": 3,
    //         "how_much_content": 3
    //       }
    //     ]
    //   },
    //   {
    //     "name_product": "Lámpara de Pie",
    //     "img_product": "https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png",
    //     "description_product": "Lámpara de pie ajustable con luz LED.",
    //     "price_product": 1500,
    //     "map_product": "",
    //     "tools": [1, 4],
    //     "materials": [
    //       {
    //         "id": 2,
    //         "how_much_content": 1
    //       }
    //     ]
    //   },
    //   {
    //     "name_product": "Escritorio de Trabajo",
    //     "img_product": "https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png",
    //     "description_product": "Escritorio de trabajo con múltiples compartimentos para almacenamiento.",
    //     "price_product": 4000,
    //     "map_product": "",
    //     "tools": [2, 5],
    //     "materials": [
    //       {
    //         "id": 1,
    //         "how_much_content": 7
    //       },
    //       {
    //         "id": 4,
    //         "how_much_content": 2
    //       }
    //     ]
    //   },
    //   {
    //     "name_product": "Cama Matrimonial",
    //     "img_product": "https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png",
    //     "description_product": "Cama matrimonial con estructura de madera y colchón incluido.",
    //     "price_product": 7000,
    //     "map_product": "",
    //     "tools": [6],
    //     "materials": [
    //       {
    //         "id": 3,
    //         "how_much_content": 10
    //       }
    //     ]
    //   },
    //   {
    //     "name_product": "Mesa de Comedor",
    //     "img_product": "https://res.cloudinary.com/dz2df15nx/image/upload/t_Incognity/v1726615786/incognita_ulfteb.png",
    //     "description_product": "Mesa de comedor extensible con capacidad para 8 personas.",
    //     "price_product": 5500,
    //     "map_product": "",
    //     "tools": [7, 8],
    //     "materials": [
    //       {
    //         "id": 2,
    //         "how_much_content": 5
    //       },
    //       {
    //         "id": 4,
    //         "how_much_content": 3
    //       }
    //     ]
    //   }
    // ]);

    await supplierStockAssociations.bulkCreate([
      {
        "id_material_fk": 1,
        "id_supplier_fk": 1,
        "amount_material": 100,
        "price_material": 1500
      },
      {
        "id_material_fk": 2,
        "id_supplier_fk": 2,
        "amount_material": 200,
        "price_material": 3200
      },
      {
        "id_material_fk": 3,
        "id_supplier_fk": 3,
        "amount_material": 150,
        "price_material": 2200
      },
      {
        "id_material_fk": 4,
        "id_supplier_fk": 4,
        "amount_material": 250,
        "price_material": 4000
      },
      {
        "id_material_fk": 5,
        "id_supplier_fk": 5,
        "amount_material": 300,
        "price_material": 4500
      },
      {
        "id_material_fk": 6,
        "id_supplier_fk": 6,
        "amount_material": 120,
        "price_material": 1800
      },
      {
        "id_material_fk": 7,
        "id_supplier_fk": 7,
        "amount_material": 80,
        "price_material": 1300
      },
      {
        "id_material_fk": 8,
        "id_supplier_fk": 8,
        "amount_material": 60,
        "price_material": 950
      },
      {
        "id_material_fk": 1,
        "id_supplier_fk": 9,
        "amount_material": 90,
        "price_material": 1400
      },
      {
        "id_material_fk": 2,
        "id_supplier_fk": 10,
        "amount_material": 110,
        "price_material": 1700
      },
      {
        "id_material_fk": 3,
        "id_supplier_fk": 11,
        "amount_material": 250,
        "price_material": 3700
      },
      {
        "id_material_fk": 4,
        "id_supplier_fk": 1,
        "amount_material": 200,
        "price_material": 3200
      },
      {
        "id_material_fk": 5,
        "id_supplier_fk": 2,
        "amount_material": 180,
        "price_material": 2700
      },
      {
        "id_material_fk": 6,
        "id_supplier_fk": 3,
        "amount_material": 130,
        "price_material": 1900
      },
      {
        "id_material_fk": 7,
        "id_supplier_fk": 4,
        "amount_material": 70,
        "price_material": 1100
      }
    ]);

    console.log('Registros cargados correctamente en la db');

  }catch(err) {
    await clearDB();
    console.log(`No fue posible cargar los registros a la db por causa del siguiente error: ${err}`);
  }
};