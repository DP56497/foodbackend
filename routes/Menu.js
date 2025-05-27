const express = require('express');
const router = express.Router();
const Menu = require('../controller/Menu');

// GET /api/menu
router.get('/', Menu.getMenu);

module.exports = router;
