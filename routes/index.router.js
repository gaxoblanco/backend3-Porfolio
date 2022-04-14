const express = require('express');

const aboutRouter = require('./about.router');
const experienceRouter = require('./exprience.router');
const skillRouter = require('./skill.router');
const studiesRouter = require('./studies.router');


function routerApi(portfolio){
  const router = express.Router();
    portfolio.use('/api/v1', router);
  router.use('/about', aboutRouter);
  router.use('/experience', experienceRouter);
  router.use('/skill', skillRouter);
  router.use('/studies', studiesRouter);
}


module.exports = routerApi;
