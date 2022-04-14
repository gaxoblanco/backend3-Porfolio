  //captura cualquier error de forma global
function logErrors (err, req, res, next){
  console.error(err);
  //con next lo ejecutamos como un middle de tipo error
  next(err);
};

  //capturamos error pero se lo mostramos al cliente
function errorHandler(err, req, res, next){
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

//configuramos un error para la libreria boom
function boomErrorHandler (err, req, res, next){
  if(err.isBoom){
    const{output} = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}
  //exportamos

module.exports = {logErrors, errorHandler, boomErrorHandler}
