// core module
const express = require('express');

const orgController = require('../controller/orgController');


const router = express.Router();

// router
//     .route('/company-name')
//     .post(orgController.createCompanyName)
//     .get(orgController.getAllCompanyName)

// router
//     .route('/company-with-branch')
//     .post(orgController.companyWithBranch)
//     .get(orgController.getAllCompanyWithBranch)

router
    .route('/add-company-branch')
    .post(orgController.addCompanyBranch)
    .get(orgController.getAllCompanyName)


// router
//     .route('/branch-head')
//     .post(orgController.addBranchHead)
//     .get(orgController.getAllBranchHead)

router
    .route('/branch-hr')
    .post(orgController.addBranchHr)
    .get(orgController.getAllBranchHr)

router
    .route('/get-branch-with-company-name')
    .post(orgController.getBranchWithCompanyName)

router  
    .route('/get-hr-head-with-company-and-branch-name')
    .post(orgController.getHrWithCompanyAndBranchName)

router  
    .route('/department')
    .post(orgController.addDepartment)
    .get(orgController.getAllDepartment)

router
    .route('/get-department-with-company-and-branch-name')
    .post(orgController.getDepartmentWithCompanyBranchName)

router
    .route('/add-assets')
    .post(orgController.addAssets)
    .get(orgController.getAllAssets)

router
    .route('/delete-asset')
    .post(orgController.deleteAsset)

router
    .route('/get-employee-with-branch')
    .post(orgController.getEmployeeWithBranch)

router
    .route('/get-org-setup')
    .get(orgController.getOrgSetup)



module.exports = router;