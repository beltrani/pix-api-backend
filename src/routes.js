const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer')

const product = require('./controllers/product');

const routs = express.Router();

//routs.get('/productSpecification/:id', product.getProductSpecification);
routs.post('/productSpecification/update/:store_id', multer(multerConfig).single('file'), 
    product.updateProductSpecification);

module.exports = routs;
