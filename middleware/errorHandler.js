// Middleware para manejar errores
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Para registrar detalles del error en la consola
  
    // Respuesta genérica para el cliente
    res.status(err.status || 500).json({
      error: {
        message: err.message || 'Internal Server Error',
        status: err.status || 500,
      },
    });
  };
  
  module.exports = errorHandler;
  