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

## There you go. 
Now you have everything set to start experimenting with the code and project.
To a better understanding of it, we'll give you a quick overview of endpoints.

# Let's see the routes 

1. /Stock
  
    #### 1.1. ```/``` (Method: GET)
    This endpoint gives you a response with all the stock.

    #### 1.2. ```/details/:id_material``` (Method: GET) 
    This endpoint connects the database with the frontend to show you the material that you are deleting.

    #### 1.3. ```/create``` (Method: POST)
    Allows you to create a new stock of any material. You need to send a body with the following fields:
    ```
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
    ```
    search_type=name_material&search_value=wood
    ```
    -search_type indicates the fields that you are searching for, in this case the field is the name_client.

    -search_value indicates the value that you are searching.
    

2. /Tools
    #### 2.1. ```/``` (Method: GET)

    #### 2.2. ```/create``` (Method: POST)

    #### 2.3. ```/disabled/:id_tool``` (Method: PATCH)

    #### 2.4. ```/delete/:id_tool``` (Method: DELETE)

    #### 2.5. ```/details/:id_tool``` (Method: GET)

    #### 2.6. ```/update/:id_tool``` (Method: GET)

    #### 2.7. ```/update/:id_tool``` (Method: PATCH)

    #### 2.8. ```/search``` (Method: GET)

3. /Products
    #### 3.1. ```/``` (Method: GET)

    #### 3.2. ```/create``` (Method: GET)

    #### 3.3. ```/create``` (Method: POST)

    #### 3.4. ```/disabled/:id_product``` (Method: PATCH)

    #### 3.5. ```/delete/:id_product``` (Method: DELETE)

    #### 3.6. ```/update/:id_product``` (Method: GET)

    #### 3.7. ```/details/:id_product``` (Method: GET)

    #### 3.8. ```/update/:id_product``` (Method: PATCH)

    #### 3.9. ```/search``` (Method: GET)

4. /Clients 

    #### 4.1.  ```/``` (Method: GET) 
    The response of this endpoint is all the clients on the database

    #### 4.2.  ```/create``` (Method: POST)
    With this endpoint you can create a new client on the database. To create a client, you need to acomplish the next fields:
        
        *name_client
        *last_name_client
        *dni_client (8 characters and unique) 
        *province_client (should be one province of Argentina)
        *direction_client (the address)
        *mail_client
        phone_number_client
        *type_client (One of the following options: Empresa, Consumidor Final, Otro)
        *cuil_or_cuit_client (11 characters)
    The fields with * are mandatory.
    #### 4.3.  ```delete/:dni_client``` (Method: POST) 
    :dni_client it's the parameter, here you have to write the DNI of a client already registered.

    #### 4.4. ```/update/:dni_client``` (Method: GET) 
    :dni_client it's the parameter, here you have to write the DNI of a client already registered. In this case, this endpoint was created to work with the front-end, so it just gives you the information.

    #### 4.5. ```/update/:dni_client``` (Method: POST) 
    :dni_client it's the parameter, here you have to write the DNI of a client already registered. This endpoint allows you to send the fields that you want to change in the database.

    #### 4.6. ```/search``` (Method: GET) 
    Here, you are going to work with params. Here is an example of how you should write the params for this endpoint: 
        
    ```/search?search_type=name_client&search_value=example```

    -search_type indicates the fields that you are searching for, in this case the field is the name_client.

    -search_value indicates the value that you are searching.

5. /Orders
    #### 5.1. ```/``` (Method: GET)

    #### 5.2. ```/create``` (Method: GET)

    #### 5.3. ```/create``` (Method: POST)

    #### 5.4. ```/disabled/:id_order``` (Method: PATCH)

    #### 5.5. ```/delete/:id_order``` (Method: DELETE)

    #### 5.6. ```/update/:id_order``` (Method: GET)

    #### 5.7. ```/update/:id_order``` (Method: PATCH)

    #### 5.8. ```/search``` (Method: GET)

6. /Suppliers
    #### 6.1. ```/``` (Method: GET)

    #### 6.2. ```/create``` (Method: GET)

    #### 6.3. ```/disabled/:id_supplier``` (Method: POST)

    #### 6.4. ```/delete/:id_supplier``` (Method: PATCH)

    #### 6.5. ```/details/id_supplier``` (Method: DELETE)

    #### 6.6. ```/update/:id_supplier``` (Method: GET)

    #### 6.7. ```/update/:id_supplier``` (Method: PATCH)

    #### 6.8. ```/search``` (Method: GET)

    #### 6.9. ```/supplierMaterials``` (Method: PATCH)

    #### 6.10. ```/supplierMaterials/:id_supplier``` (Method: GET)

7. /Suppliers/suppliersMaterials
    #### 3.1. ```/create``` (Method: POST)

    #### 3.2. ```/update/:id_supplier_material``` (Method: PATCH)

    #### 3.3. ```/delete/:id_supplier_material``` (Method: DELETE)

8. /Purchase
    #### 3.1. ```/``` (Method: GET)

    #### 3.2. ```/:id_supplier``` (Method: GET)

    #### 3.3. ```/``` (Method: POST)


