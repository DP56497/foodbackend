const express = require('express');
const router = express.Router();
const Order = require('../controller/Order');
const {patchOrder }= require('../controller/Order')

// GET /api/orders
router.get('/', Order.getOrders);

// POST /api/orders
router.post('/', Order.addOrder);
router.patch('/:id/status', patchOrder)
router.get('/', Order.companyOrders )

router.get("/test/:id/status", (req, res) => {
  console.log("✅ TEST req.params:", req.params);
  res.json({ received: req.params });
});


module.exports = router;
