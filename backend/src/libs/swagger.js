import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Wotech - Carpentry Manager',
            description: 'Una API para gestionar una carpintería',
            version: '1.7.2',
            contact: {
                name: 'Soporte de API',
                email: 'alejoviviani12@gmail.com'
            }
        },
        servers: [{
                url: 'http://localhost:8080',
                description: 'Servidor de desarrollo'
            }],
    },
    apis: ['src/Components/Stock/stockRouter.js']
}

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDoc = (app, port) => {
    app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`Documentación de API disponible en http://localhost:${port}/api-doc`);
};




