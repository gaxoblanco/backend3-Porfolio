const boom = require('@hapi/boom');

//resivo el esquema a validar y la propiedad

function validatorHandler(schema, property){
    //retorno algo con formato de midelword
  return (req, res, next) => {
    const data = req[property];
    const {error} = schema.validate(data, {abortEarly: false});
    if (error){
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler
