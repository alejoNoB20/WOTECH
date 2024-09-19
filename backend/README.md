# INTRODUCTION

Alongside this readme you are going to understand how the backend works for our project and how to set up.
So let's start!

## Getting Started

We are assuming that you already clone the repository and moved into the folder.

### 1. Install the dependencies

```bash
npm install
```

### 2. Create the .env file with the following fields

```makefile
PORT
DB_NAME
DB_USER
DB_PASSWORD
DB_HOST
```

### 3. Connect to a database

As the project was created using MySQL and the ORM of Sequalize, you need to connect to that kind of DB.

### 4. Run the server

If you are on windows you need to install xampp, run the MySQL service and connect both to it (with both I mean to the database and the backend site).

### 5. Start the scripts

You have to commands with which you can run the code:

```bash
npm run start
```

or

```bash
npm run dev
```

The only difference between them, is that 'dev' run with nodemon and its watching for every change that you could make in the code, and 'start' doesn't.

## There you go

Now you have everything set to start experimenting with the code and project.
To a better understanding of it, we'll give you a quick overview of endpoints.

## Let's see the routes

## The URL that you should write is like the following

```text
localhost:{PORT}/{ROUTE}
```

PORT should be replaced by the PORT that you are running the server on.
ROUTE refers to the route that you want to access, for example: ```/stock```

## 1. Stock

### 1.1. ```/``` (Method: GET)

This endpoint gives you a response with all the stock.

#### 1.2. ```/details/:id_material``` (Method: GET)

This endpoint connects the database with the frontend to show you the material that you are deleting.

#### 1.3. ```/create``` (Method: POST)

Allows you to create a new stock of any material. You need to send a body with the following fields:

```text
name_material
description_material
amount_material
measurement_material
```

#### 1.4. ```/disabled/:id_material``` (Method: PATCH)

With this endpoint you make a material unavailable to use.

#### 1.5. ```/delete/:id_material``` (Method: DELETE)

This is the endpoint that deletes a material from the database.

#### 1.6. ```/update/:id_material``` (Method: GET)

The response gives you the material that you are searching for.

#### 1.7. ```/update/:id_material``` (Method: PATCH)

Allows you to update a material information.

#### 1.8. ```/search``` (Method: GET)

Gives you the material that you are searching for. You have to use params. For example:

```text
search_type=name_material&search_value=wood
```

-search_type indicates the fields that you are searching for, in this case the field is the name_client.

-search_value indicates the value that you are searching.

## 2. Tools

### 2.1. ```/``` (Method: GET)

Shows you all the tools.

#### 2.2. ```/create``` (Method: POST)

Allows you to create a new tool with the next fields:

```text
name_tool
localtion_tool
```

#### 2.3. ```/disabled/:id_tool``` (Method: PATCH)

With this endpoint you can set a tool a unavailable. The parameter is the id of the tool.

#### 2.4. ```/delete/:id_tool``` (Method: DELETE)

It allows you to delete the tool from the database. Again, with its id as parameter.

#### 2.5. ```/details/:id_tool``` (Method: GET)

Using the id it shows you the information of that tool.

#### 2.6. ```/update/:id_tool``` (Method: PATCH)

With the id as a parameter you can update a tool, of course you need to pass in the body the fields that you want to change.

#### 2.7. ```/search``` (Method: GET)

You can search, with query params, multiple tools.

## 3. Products

### 3.1. ```/``` (Method: GET)

Shows all the products.

#### 3.2. ```/getCreate``` (Method: GET)

Connects the database with the frontend to show the information.

#### 3.3. ```/create``` (Method: POST)

You can create a product with the following fields:

```text
name_product
img_product
description_product
price_product
materials
tools
```

#### 3.4. ```/disabled/:id_product``` (Method: PATCH)

Endpoint used to set a product as unavailable (logical delete).

#### 3.5. ```/delete/:id_product``` (Method: DELETE)

Endpoint used to delete a product from the database.

#### 3.7. ```/details/:id_product``` (Method: GET)

Sends to the client the details of the product that matches with the ID.

#### 3.6. ```/getUpdate/:id_product``` (Method: GET)

Sends to the client the details of the product that matches with the ID and allows you to change it.

#### 3.8. ```/update/:id_product``` (Method: PATCH)

With this endpoint, you can update a product.

#### 3.9. ```/search``` (Method: GET)

Returns all the products that matches with the query params.

## 4. Clients

### 4.1.  ```/``` (Method: GET)

The response of this endpoint is all the clients on the database

#### 4.2.  ```/create``` (Method: POST)

With this endpoint you can create a new client on the database. To create a client, you need to acomplish the next fields:

```text
*name_client
*last_name_client
*dni_client (8 characters and unique) 
*province_client (should be one province of Argentina)
*direction_client (the address)
*mail_client
phone_number_client
*type_client (One of the following options: Empresa, Consumidor Final, Otro)
*cuil_or_cuit_client (11 characters)
```

The fields with * are mandatory.

#### 4.3.  ```delete/:dni_client``` (Method: POST)

:dni_client it's the parameter, here you have to write the DNI of a client already registered.

#### 4.4. ```/update/:dni_client``` (Method: GET)

:dni_client it's the parameter, here you have to write the DNI of a client already registered. In this case, this endpoint was created to work with the front-end, so it just gives you the information.

#### 4.5. ```/update/:dni_client``` (Method: POST)

:dni_client it's the parameter, here you have to write the DNI of a client already registered. This endpoint allows you to send the fields that you want to change in the database.

#### 4.6. ```/search``` (Method: GET)

Here, you are going to work with params. Here is an example of how you should write the params for this endpoint:

```text
/search?search_type=name_client&search_value=example
```

-search_type indicates the fields that you are searching for, in this case the field is the name_client.

-search_value indicates the value that you are searching.

## 5. Orders

### 5.1. ```/``` (Method: GET)

Returns all the orders from the customers.

#### 5.2. ```/getCreate``` (Method: GET)

Connects the database with the frontend, returning the order.

#### 5.3. ```/create``` (Method: POST)

The endpoint that creates the new orders. It should have the following fields:

```text
id_client_fk
shipping_address_order
delivery_day_order
products
```

#### 5.4. ```/disabled/:id_order``` (Method: PATCH)

It's the logical delete, sets the order as unavailable.

#### 5.5. ```/delete/:id_order``` (Method: DELETE)

This endpoint deletes the order from the database.

#### 5.6. ```/details/:id_order``` (Method: GET)

Shows you all the details from one specific order.

#### 5.7. ```/update/:id_order``` (Method: PATCH)

Used to modifie an order.

#### 5.8. ```/search``` (Method: GET)

Returns all the orders that matches with the query params.

### 6. Suppliers

#### 6.1. ```/``` (Method: GET)

Get all the suppliers saved on the database.

#### 6.2. ```/create``` (Method: POST)

Endpoint to create a new supplier with the next fields:

```text
name_company_supplier
reason_social_supplier
cuit_company_supplier
description_supplier
tax_address_supplier
number_phone_company_supplier
mail_company_supplier
website_company_supplier
distributor_name_supplier
number_phone_distributor_supplier
mail_distributor_supplier
delivery_days_suppier
payment_method_supplier
```

#### 6.3. ```/disabled/:id_supplier``` (Method: PATCH)

Logical delete of a supplier.

#### 6.4. ```/delete/:id_supplier``` (Method: DELETE)

Permanent delete of a supplier from the database.

#### 6.5. ```/details/id_supplier``` (Method: GET)

Returns all the details from one specific supplier.

#### 6.6. ```/update/:id_supplier``` (Method: PATCH)

Allows you to modifie the information of a supplier

#### 6.7. ```/search``` (Method: GET)

Returns all the matches with the query params.

## 7. suppliers/suppliersMaterials

This route is used to interact with the materials sold by each supplier.

### 7.1. ```/create``` (Method: POST)

The endpoint used to created the associations.

#### 7.2. ```/update/:id_supplier_material``` (Method: PATCH)

Modifie the associations.

#### 7.3. ```/disabled/:id_supplier_material``` (Method: PATCH)

Set an association as unavailable.

#### 7.4. ```/priceControl/:id_supplier_material``` (Method: GET)

It shows the associations that a supplier has.

## 8. Purchase

### 8.1. ```/``` (Method: POST)

This endpoint is called when a product is sold.

## 9. /suppliers/invoices

This route is used to interact with the billing of the suppliers.

### 9.1. ```/:id_supplier``` (Method: GET)

Shows you all the billings from a singles supplier.

#### 9.2. ```/push``` (Method: POST)

Create the billing on the database.

#### 9.3.```/disabled/:id_invoice``` (Method: PATCH)

Set a billing as unavailable.

This is all the basic information that you need to start playing with our project as an API. If you want more detailed endpoints and routes you can check our Swagger documentation here:

```text
http://localhost:{PORT}/api-doc/
```

Remember, PORT should be replaced with the port set in the .env file.
