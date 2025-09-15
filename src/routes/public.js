const express = require('express');
const router = express.Router();
require('dotenv').config();

const authrouter = require('./api/auth.js');
router.use(process.env.BASE_URL, authrouter);
module.exports = router;