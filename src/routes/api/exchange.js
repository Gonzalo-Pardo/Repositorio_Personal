// src/routes/api/exchange.js
const { Router } = require('express');
const ctrl = require('../../controllers/exchange.controller');

const router = Router();


router.get('/rates', ctrl.listRates);                  
router.get('/rates/:base/:quote', ctrl.getLatestRate); 
router.post('/rates', ctrl.upsertRate);                
router.post('/convert', ctrl.convert);                 

module.exports = router;
