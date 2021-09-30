function errorHandler(error, request, response, next) {
  const statusCode = error.status || 500
  response.status(statusCode).json(error)
}

module.exports = errorHandler
