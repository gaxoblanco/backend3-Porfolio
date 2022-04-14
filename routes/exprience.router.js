const express = require('express');
const router = express.Router();

const ExperiencesService = require('./../services/experience.services');
const service = new ExperiencesService();
const validatorHandler = require('./../middleware/validator.handler');
const {createValidator, updateValidator, idValidator} = require('./../schemas/validator.schema');
//---------------

router.get('/', async (req, res, next) =>{
  const experiences = await service.find();
  res.json(experiences)
});

router.get('/:id',
  validatorHandler(idValidator, 'params'),
  async (req, res, next) =>{
  try{
    const {id} = req.params;
    const experience = await service.findOne(id);
    res.json(experience);
  } catch (error){
      next(error);
  }
});

router.post('/',
  validatorHandler(createValidator, 'body'),
  async (req, res, next) =>{
  try{
    const body = req.body;
    const newExperience = await service.create(body);
    res.json(newExperience);
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
    const experience = await service.update(id, body);
    res.json(experience);
  } catch (error){
      next(error);
  }
});

router.delete('/:id',
  validatorHandler(idValidator, 'params'),
  async (req, res, next) =>{
  try {
    const {id} = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch(error){
      next(error);
  }
});

module.exports = router;
