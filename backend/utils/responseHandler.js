// Backend utility for response formatting
class ResponseHandler {
  // Success response
  static success(res, data, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  // Error response
  static error(res, error, message = 'Error', statusCode = 500) {
    console.error('Error:', error);
    return res.status(statusCode).json({
      success: false,
      message,
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error'
    });
  }

  // Validation error response
  static validationError(res, errors) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors
    });
  }

  // Not found response
  static notFound(res, resource = 'Resource') {
    return res.status(404).json({
      success: false,
      message: `${resource} not found`
    });
  }

  // Unauthorized response
  static unauthorized(res, message = 'Unauthorized') {
    return res.status(401).json({
      success: false,
      message
    });
  }

  // Forbidden response
  static forbidden(res, message = 'Forbidden') {
    return res.status(403).json({
      success: false,
      message
    });
  }
}

module.exports = ResponseHandler;
