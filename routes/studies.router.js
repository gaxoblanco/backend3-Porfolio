const express = require('express');
const router = express.Router();

const StudiesService = require('./../services/studies.services');
const service = new StudiesService();
const validatorHandler = require('./../middleware/validator.handler');
const {createValidator, updateValidator, idValidator} = require('./../schemas/validator.schema');

//------------

router.get('/',
  async (req, res, next) =>{
  const studies = await service.find();
  res.json(studies);
});

router.get('/:id',
validatorHandler(idValidator, 'params'),
  async (req, res, next) =>{
  try {
    const {id} = req.params;
    const studie = await service.findOne(id);
    res.json(studie);
  } catch (error) {
      next(error);
  }
});

router.post('/',
  validatorHandler(createValidator, 'body'),
  async (req, res, next) =>{
  try {
    const body = req.body;
    const newStudie = await service.create(body);
    res.json(newStudie);
  } catch (error) {
      next (error);
  }
});

router.patch('/:id',
  validatorHandler(idValidator, 'params'),
  validatorHandler(updateValidator, 'body'),
  async (req, res, next) =>{
  try {
    const {id} = req.params;
    const body = req.body;
    const studie = await service.update(id, body);
    res.json(studie);
  } catch (error) {
      next(error);
  }
});

router.delete('/:id',
  validatorHandler(idValidator, 'params'),
  async (req, res, next) =>{
  const {id} = req.params;
  const rta = await service.delete(id);
  res.json(rta)
});

module.exports = router;
