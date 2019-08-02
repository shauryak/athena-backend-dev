const config = require('../config/config');
module.exports.errorHandler = function (err, req, res, next) {

  if (res.headersSent) {
    // console.log(err);
    return next(err)
  }

  const environment = config.environment ? config.environment : "production";
  if (environment === "development")
    return res.status(500).json({ "statusCode": 500, "error": "Internal server error", "errorMessage": "An error occured while processing your request", "response": null });
  else
    return res.status(500).json({ "statusCode": 500, "error": "Internal server error", "errorMessage": "An error occured while processing your request", "response": null });
}