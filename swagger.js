const swaggerAutogen = require('swagger-autogen')();


const doc = {
  info: {
    title: 'Contact List API', 
    description: 'API para la gestión de contactos', 
    version: '1.0.0', 
  },
  host: 'localhost:8080', 
  basePath: '/', 
  schemes: ['http', 'https'], 
  consumes: ['application/json'], 
  produces: ['application/json'], 
};


const outputFile = './swagger.json'; 
const endpointsFiles = ['./routes/index.js', './routes/contacts.js'];


swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated at ' + outputFile);
});
