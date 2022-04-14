const express = require('express');
const router = express.Router();

const SkillServices = require('./../services/skill.services');
const service = new SkillServices();

const validatorHandler = require('./../middleware/validator.handler');
const {createValidator, updateValidator, idValidator} = require('./../schemas/validator.schema');

//endpoint inicial
router.get('/', async (req, res) =>{
  const skills = await service.find();
  res.json(skills);
});

//endpoint de detalle
router.get('/:id',
  validatorHandler(idValidator, 'params'),
  async (req, res, next) =>{
  try {
    const {id} = req.params;
    const skill = await service.findOne(id);
    res.json(skill);
  } catch (error) {
      next(error);
  }
});

//crear skill
router.post('/',
  validatorHandler(createValidator, 'body'),
  async (req, res, next) =>{
  try {
    const body = req.body;
    const newSkill = await service.create(body);
    res.json(newSkill);
  } catch (error) {
      next(error);
  }
});

//modificar skill
router.patch('/:id',
  validatorHandler(idValidator, 'params'),
  validatorHandler(updateValidator, 'body'),
  async (req, res, next) =>{
  try {
    const {id} = req.params;
    const body = req.body;
    const skill = await service.update(id, body);
    res.json(skill);
  } catch (error) {
      next(error)
  }
});

//delete skill
router.delete('/:id',
  validatorHandler(idValidator, 'params'),
  async (req, res, next) =>{
  try {
    const {id} = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error) {
      next(error)
  }
});


module.exports = router;
