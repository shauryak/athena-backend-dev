module.exports.errorHandler = function(err,req,res,next){

    if (res.headersSent) {
       // console.log(err);
        return next(err)
      }
    return  res.status(500).json({ "statusCode": 500, "error":"Internal server error","errorMessage":err, "response": null });
}