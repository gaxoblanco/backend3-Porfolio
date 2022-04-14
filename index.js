const cors = require('cors');
const express = require('express');
const routerApi = require('./routes/index.router');
const {logErrors, errorHandler, boomErrorHandler} = require('./middleware/error.handler');
const portfolio = express();
const port = process.env.PORT || 3000;

//-----
portfolio.use(express.json());

portfolio.get('/', (req, res)=>{
  res.send('Hola mi server en express para porfolio');
});

//----
const whiteList = ['http://localhost:3000', 'http://localhost:5500'];
const options = {
  origin: (origin, callback) =>{
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else{
      callback(new Error('Access denied'));
    }
  }
};
portfolio.use(cors());

//---
routerApi(portfolio);
portfolio.use(logErrors);
portfolio.use(boomErrorHandler);
portfolio.use(errorHandler);

//--
portfolio.listen(port, ()=>{
  console.log('port: ' + port)
})
