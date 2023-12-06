const express = require('express');
const router = express.Router();
const leaveController = require('../controller/leaveController')



router
    .route('/get-leaves')
    .get(leaveController.getLeaves)

module.exports = router
