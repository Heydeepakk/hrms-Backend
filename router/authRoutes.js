const express = require('express');
const authController = require('../controller/authController');

const router = express.Router();

router
    .route('/login')
    .post(authController.login);

    router
    .route('/employee-login')
    .post(authController.employeeLogin);

router
    .route('/validate-otp')
    .post(authController.validateOtp)


module.exports = router;