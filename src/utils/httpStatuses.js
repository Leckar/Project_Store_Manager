const httpStatuses = {
  OK_STATUS: 200,
  CREATED_STATUS: 201,
  NO_CONTENT_STATUS: 204,
  BAD_REQUEST_STATUS: 400,
  UNAUTHORIZED_STATUS: 401,
  NOT_FOUND_STATUS: 404,
  UNPROCESSABLE_ENTITY: 422,
};

const statMatch = (type) => httpStatuses[type] || 500;

module.exports = {
  httpStatuses,
  statMatch,
};