const express = require('express');
const router = express.Router();
const { executeQuery, getHint } = require('../controllers/sqlController');

router.post('/execute', executeQuery);
router.post('/hint', getHint);

module.exports = router;