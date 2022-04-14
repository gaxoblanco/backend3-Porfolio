const express = require('express');
const router = express.Router();

const aboutServices = require('./../services/about.services');
const service = new aboutServices();

const validatorHandler = require('./../middleware/validator.handler');
const {createValidator, updateValidator, idValidator} = require('./../schemas/validator.schema');


router.get('/', async (req, res) =>{
  const abouts = await service.find();
  res.json(abouts);
})

router.get('/:id',
  validatorHandler(idValidator, 'params'),
  async (req, res, next) =>{
  try{
    const {id} = req.params;
    const about = await service.findOne(id);
    res.json(about);
  } catch (error){
      next(error);
  }
});

router.post('/',
  validatorHandler(createValidator, 'body'),
  async (req, res, next) =>{
  try{
    const body = req.body;
    const newAbout = await service.create(body);
    res.json(newAbout);
  } catch (error){
      next(error);
  }
});

router.patch('/:id',
  validatorHandler(idValidator, 'params'),
  validatorHandler(updateValidator, 'body'),
  async (req, res, next) =>{
  try {
    const {id} = req.params;
    const body = req.body;
    const about = await service.update(id, body);
    res.json(about);
  } catch (error) {
      next(error);
  }
});

router.delete ('/:id',
  validatorHandler(idValidator, 'params'),
  async (req, res, next) =>{
  try {
    const {id} = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error) {
      next(error);
  }
});

module.exports = router;
