# INTRODUCCIÓN
A lo largo de este Readme vas a entender como trabaja el Back-End de nuestro proyecto y como configurarlo. 
Sin nada más, empecemos!

## Guía 
Asumimos que el repositorio ya se encuentra clonado y estás dentro de la carpeta /backend.

### 1. Instalar dependencias
```bash
npm install
```

### 2. Crear un archivo .env con los siguientes campos
```makefile
PORT= 'Nº de puerto'
DB_NAME= 'Nombre de la base de datos'
DB_USER= 'Nombre de usuario de la base de datos'
DB_PASSWORD= 'Contraseña de la base de datos'
DB_HOST= 'Server HOST'
DB_SERVER_URL= 'http://(DB_HOST):(PORT)'
// Datos de conexión con el gestor de imagenes CLOUDINARY (opcional)
// "Tener en cuenta que en caso de no conectar con la DB de imagenes no podrá ver ni guardar ningun tipo de imagen"
CLOUD_NAME= 'Nombre de la nube'
API_KEY= 'Llave de la nube'
API_SECRET= 'Llave secreta de la nube'
CLOUDINARY_URL= 'URL de tu nube'
```

### 3. Conectarse a la base de datos
Para este proyecto usamos como gestor de DB MySQL y como ORM a Sequelize, necesitas conectarte a este tipo de DB.

### 4. Iniciar el servidor
Si estás en Windows necesitas instalar un paquete gestor de base de datos como puede ser XAMPP, y iniciar la DB local MySQL (debes crear la DB antes de conectar con el backend porque en caso contrario no sincronizaras la DB), para luego conectar con el Back-End.

### 5. Iniciar Wotech
Puedes iniciarlo de 2 maneras:
```bash
npm run start
```
o
```bash
npm run dev
```

La diferencia entre ambos modos, es que 'dev' corre con nodemon y vigila cada cambio que puedes ejecutar en tu código en cambio 'start' no.

## Ya lo tienes. 
Ya está todo listo para que empiezes a usar Wotech, para entender como funciona el sistema te brindaremos toda la información sobre los EndPoints.

# Veamos las rutas 

## Documentación de endpoints con Swagger UI
Si quieres ver el funcionamiento y descripción de las APIs de más colorida y divertida debes ingresar a /api-doc, donde además podrás interactuar con algunas de ellas.
```
{HOST}:{PORT}/api-doc     

Ejemplo: localhost:8080/api-doc

```

## La forma de escribir las URLs es la siguiente
    
```
{HOST}:{PORT}/{ROUTE}              

```
Debes remplazar HOST y PORT con los datos que ingresaste en tu .env, y para interactuar con cada módulo debes ingresar su nombre seguidos de las acciones.

```
Ejemplo 1: localhost:8080/stock/create
Ejemplo 2: localhost:8080/stock/update/1

```
## 1. Stock 

#### 1.1. ```/``` (Método: GET)
Devuelve una lista con todos los stock registrados.

#### 1.2. ```/details/:id_material``` (Método: GET) 
Muestra con mayor detalle las características de un stock.

#### 1.3. ```/create``` (Método: POST)
Te permite crear un nuevo stock. Necesitas enviar al BackEnd un JSON con los siguientes campos (como mínimo).

```
EJEMPLO: {
  "name_material": "Madera de pino",
  "measurement_material": "cm",
}
```
NOTA: El campo measurement_material solo permite los siguientes valores: 'cm' y 'unidad'

#### 1.4. ```/disabled/:id_material``` (Método: PATCH)
Con este endpoint puedes deshabilitar un stock.

#### 1.5. ```/delete/:id_material``` (Método: DELETE)
Con este endpoint borras definitivamente un stock de la DB.

#### 1.6. ```/update/:id_material``` (Método: PATCH)
Permite actualizar la información de un stock.

#### 1.7. ```/search``` (Método: GET)
Filtro de búsqueda, que mediante el uso de querys devuelve una lista de materiales en específico. Por ejemplo:
```
search_type=name_material&search_value=wood
```
-search_type indica el campo de tipo de búsqueda, permite los siguientes valores: 'id_material', 'name_material', 'amount_material'

-search_value indica el valor de los que buscas.
    

## 2. Tools

#### 2.1. ```/``` (Método: GET)
Devuelve una lista con todos las herramientas registradas.

#### 2.2. ```/details/:id_tool``` (Método: GET)
Muestra con mayor detalle las características de una herramienta.

#### 2.3. ```/create``` (Método: POST)
Te permite crear una nueva herramienta. Necesitas enviar al BackEnd un JSON con los siguientes campos (como mínimo).

```
EJEMPLO: {
  "name_tool": "Martillo",
  "location_tool": "Mueble 1",
}
```
NOTA: si bien el estado de la herramientas es obligatorio, para la creación no es necesario ya que se entiende que esta Habilitado por defecto.


#### 2.4. ```/disabled/:id_tool``` (Método: PATCH)
Con este endpoint puedes deshabilitar una herramienta.

#### 2.5. ```/delete/:id_tool``` (Método: DELETE)
Con este endpoint borras definitivamente una herramienta de la DB.

#### 2.6. ```/update/:id_tool``` (Método: PATCH)
Permite actualizar la información de una herramienta.

#### 2.7. ```/search``` (Método: GET)
Filtro de búsqueda, que mediante el uso de querys devuelve una lista de herramientas en específico. Por ejemplo:
```
search_type=name_tool&search_value=hammer
```
-search_type indica el campo de tipo de búsqueda, permite los siguientes valores: 'id_tool', 'name_tool', 'status_tool', 'location_tool', 'repair_shop_tool'

-search_value indica el valor de los que buscas.

## 3. Products

#### 3.1. ```/``` (Método: GET)
Devuelve una lista con todos los productos registrados.

#### 3.2. ```/getStockAndTools``` (Método: GET)
Devuelve información necesaria sobre stock y tools registradas en la DB para brindar al Front-End.

#### 3.3. ```/create``` (Método: POST)
Te permite crear un nuevo producto. Necesitas enviar al BackEnd un JSON con los siguientes campos (como mínimo).

```
EJEMPLO: {
  "name_product": "Mesa",
  "price_product": 5800,
  "tools": [
    1,
    2,
    3
  ],
  "materials": [
    {
      "id": 1,
      "how_much_content": 28
    }
  ]
```
NOTA: El parámetro 'tools' es un array donde cada elemento es el ID de una herramienta y el parámetro 'materials' es un array donde cada elemento es un objeto con las claves 'id': contiene el ID de un stock, 'how_much_content': contiene las cantidades de dicho stock que se van a utilizar para la creación del producto.

#### 3.4. ```/disabled/:id_product``` (Método: PATCH)
Con este endpoint puedes deshabilitar un producto.

#### 3.5. ```/delete/:id_product``` (Método: DELETE)
Con este endpoint borras definitivamente un producto de la DB.

#### 3.6. ```/details/:id_product``` (Método: GET)
Muestra con mayor detalle las características de un producto.

#### 3.7. ```/update/:id_product``` (Método: PATCH)
Permite actualizar la información de un producto.

#### 3.8. ```/search``` (Método: GET)
Filtro de búsqueda, que mediante el uso de querys devuelve una lista de productos en específico. Por ejemplo:
```
search_type=name_product&search_value=table
```
-search_type indica el campo de tipo de búsqueda, permite los siguientes valores: 'name_product', 'id_product'

-search_value indica el valor de los que buscas.

## 4. Clients 

#### 4.1.  ```/``` (Método: GET) 
Devuelve una lista con todos los clientes registrados.

#### 4.2.  ```/create``` (Método: POST)
Te permite crear un nuevo cliente. Necesitas enviar al BackEnd un JSON con los siguientes campos (como mínimo).

```
EJEMPLO: {
  "name_client": "John",
  "last_name_client": "Travolta",
  "province_client": "Buenos Aires",
  "direction_client": "Calle 123",
  "phone_number_client": "84 153-4865",
  "type_client": "Consumidor Final"
}
```

#### 4.3. ```/details/:id_client``` (Método: GET)
Muestra con mayor detalle las características de un cliente.

#### 4.4.  ```disabled/:id_client``` (Método: POST) 
Con este endpoint puedes deshabilitar un cliente.

#### 4.5. ```/delete/:id_client``` (Método: DELETE) 
Con este endpoint borras definitivamente un cliente de la DB.

#### 4.6. ```/update/:id_client``` (Método: POST) 
Permite actualizar la información de un cliente.

#### 4.7. ```/search``` (Método: GET) 
Filtro de búsqueda, que mediante el uso de querys devuelve una lista de clientes en específico. Por ejemplo:
```
search_type=name_cliente&search_value=John
```
-search_type indica el campo de tipo de búsqueda, permite los siguientes valores: 'name_client', 'last_name_client', 'id_client', 'dni_client', 'cuil_or_cuit_client', 'type_client'

-search_value indica el valor de los que buscas.

## 5. Orders

#### 5.1. ```/``` (Método: GET)
Devuelve una lista con todos los pedidos registrados.

#### 5.2. ```/getProducts``` (Método: GET)
Devuelve información necesaria sobre los productos registradas en la DB para brindar al Front-End.

#### 5.3. ```/create``` (Método: POST)
Te permite crear un nuevo pedido el cual teniendo en cuenta los materiales que son necesarios para su creación, restando automáticamente la cantidad total de nuestro stock. Necesitas enviar al BackEnd un JSON con los siguientes campos (como mínimo).

```
EJEMPLO: {
  "id_client_fk": 2,
  "delivery_day_order": "2024-08-08",
  "products": [
    {
      "id": 1,
      "price_product": 5000,
      "unit_product": 15
    }
  ]
}
```
NOTA: El parámetro 'products' es un array en el cual sus items son objetos, cada objeto contiene 'id': id del producto, 'price_product': precio del producto, 'unit_product': las cantidades del producto en el pedido

#### 5.4. ```/disabled/:id_order``` (Método: PATCH)
Con este endpoint puedes deshabilitar una pedido.

#### 5.5. ```/delete/:id_order``` (Método: DELETE)
Con este endpoint borras definitivamente un pedido de la DB.

#### 5.6. ```/details/:id_order``` (Método: GET)
Muestra con mayor detalle las características de un pedido.

#### 5.7. ```/update/:id_order``` (Método: PATCH)
Permite actualizar la información de un pedido.

#### 5.8. ```/search``` (Método: GET)
Filtro de búsqueda, que mediante el uso de querys devuelve una lista de pedido en específico. Por ejemplo:
```
search_type=id_order&search_value=1
```
-search_type indica el campo de tipo de búsqueda, permite los siguientes valores: 'id_order', 'id_client', 'shipping_address_order' ,'delivery_day_order'

-search_value indica el valor de los que buscas.

### 6. Suppliers

#### 6.1. ```/``` (Método: GET)
Devuelve una lista con todos los proveedores registrados.

#### 6.2. ```/create``` (Método: POST)
Te permite crear un nuevo proveedor. Necesitas enviar al BackEnd un JSON con los siguientes campos (como mínimo).

```
EJEMPLO: {
  "name_company_supplier": "The Coca-Cola Company",
  "tax_address_supplier": "Amancio Avenida 3570",
  "number_phone_company_supplier": "341 814-8453"
}
```

#### 6.3. ```/disabled/:id_supplier``` (Método: PATCH)
Con este endpoint puedes deshabilitar una proveedor.

#### 6.4. ```/delete/:id_supplier``` (Método: DELETE)
Con este endpoint borras definitivamente un proveedor de la DB.

#### 6.5. ```/details/id_supplier``` (Método: GET)
Muestra con mayor detalle las características de un proveedor.

#### 6.6. ```/update/:id_supplier``` (Método: PATCH)
Permite actualizar la información de un proveedor.

#### 6.7. ```/search``` (Método: GET)
Filtro de búsqueda, que mediante el uso de querys devuelve una lista de proveedores en específico. Por ejemplo:
```
search_type=name_company_supplier&search_value=PepsiCo  
```
-search_type indica el campo de tipo de búsqueda, permite los siguientes valores: 'name_company_supplier', 'distributor_name_supplier'  

-search_value indica el valor de los que buscas.

## 7. suppliers/suppliersMaterials
Esta ruta se utiliza para interactuar con los materiales que vende cada proveedor.

#### 7.1. ```/:id_supplier``` (Método: GET)
Devuelve una lista con todos los materiales asociados a un proveedor registrados.

#### 7.2. ```/create``` (Método: POST)
Te permite crear un nuevo material asociado. Necesitas enviar al BackEnd un JSON con los siguientes campos (como mínimo).

```
EJEMPLO: {
  "id_material_fk": 1,
  "id_supplier_fk": 2,
  "amount_material": 500,
  "price_material": 7000
}
```

#### 7.2. ```/update/:id_supplier_material``` (Método: PATCH)
Permite actualizar la información de un material asociado.

#### 7.3. ```/disabled/:id_supplier_material``` (Método: PATCH)
Con este endpoint puedes deshabilitar una material asociado.

#### 7.4. ```/priceControl/:id_supplier_material``` (Método: GET)
Muestra una lista con todos los precio que tuvo un material asociado a lo largo del tiempo.

## 8. Purchase

#### 8.1. ```/``` (Método: POST)
Con este endpoint vas a poder efectuar una compra de materiales de un proveedor y va a sumar automáticamente los materials a tu lista de stock. Necesitas enviar al BackEnd un JSON con los siguientes campos (como mínimo).

```
EJEMPLO: {
  "purchase": [
    {
      "id_supplier_material": 1,
      "unit_material": 3
    }
  ]
}
```
NOTA: 'purchase' es un array donde sus items son objetos, cada objeto contiene 'id_supplier_material': es el material de proveedor que se va a comprar y 'unit_material': es la cantidad de ese material que se va a comprar

## 9. /suppliers/invoices
Esta ruta es utilizada para guardar las facturas de compras de los proveedores.

#### 9.1. ```/:id_supplier``` (Método: GET)
Muestra una lista con las facturaciones de un proveedor.

#### 9.2. ```/push``` (Método: POST)
Sube la factura de un proveedor a la base de datos.

```
EJEMPLO: {
  "invoice": "url de la factura del proveedor..."
}
```

#### 9.3.``` /disabled/:id_invoice``` (Método: PATCH)
Con este endpoint puedes deshabilitar una factura.

## Modelados de las tablas SQL

( * ) => CAMPOS OBLIGATORIOS
 
### stock
```
id_material*	
name_material*
description_material	
amount_material	
measurement_material*	
disabled	
```
### tools
```
id_tool
name_tool*	
description_tool	
status_tool*	
location_tool*	
repair_shop_tool	
repair_date_tool	
search_repair_tool	
disabled		
```
### suppliers
```
id_supplier
name_company_supplier*	
reason_social_supplier	
cuit_company_supplier	
description_supplier	
tax_address_supplier*	
number_phone_company_supplier*	
mail_company_supplier	
website_company_supplier	
distributor_name_supplier	
number_phone_distributor_supplier	
mail_distributor_supplier	
delivery_days_suppier	
payment_method_supplier	
disabled	
	
```
### products
```
id_product	
name_product*	
img_product	
description_product	
price_product*	
map_product	
disabled	
stocks*	
tools*	
```
### supplierMaterials
```
id_material_fk*	
id_supplier_fk*	
amount_material*	
price_material*	
disabled	
```
### priceControl
```
id_price_control	
id_material_supplier_fk*	
register_price_control*
createdAt	
```
### orders
```
id_order	
shipping_address_order
delivery_day_order*
disabled	
price_order*	
id_client_fk	
```
### invoices
```
id_invoice	
id_supplier*	
invoice*	
disabled	
```
### clients
```
id_client	
name_client*	
last_name_client*	
dni_client*
province_client*	
direction_client*	
mail_client	
phone_number_client*	
type_client*	
cuil_or_cuit_client	
disabled
```

Esto es todo lo que trae implementado Wotech (por el momento) así que estás listo para empezar a usarlo!
