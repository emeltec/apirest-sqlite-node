const express = require('express');
const router = express();
const homeController = require('../controllers/homeController')
const productsController = require('../controllers/productsController')


module.exports = () => {
  
  router.get('/', homeController.home);
  router.get('/login', homeController.login);
  
  router.get('/products', productsController.getList);
  router.get('/products/:id', productsController.getById);
  router.post('/products', productsController.create);
  router.put('/products/:id', productsController.update);
  router.delete('/products/:id', productsController.delete);

  return router;
}