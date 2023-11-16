const catchAsync =  require('../utils/catchAsync');
const AppError = require('../utils/appError');
const con = require('../utils/db');

// company create
exports.createCompanyName = catchAsync(async(req, res, next)  => {

    const comp_name = await req.body.comp_name;

    const sql = `INSERT INTO organisation(company_name) VALUES(?)`;
    con.query(sql, comp_name, (err, result) => {
        
        if(err) return next(new AppError('Something went wrong! Please try again later!', 400))
        if(result.affectedRows == 0) return next(new AppError('Please fill the Inputs!', 400))

        res.status(201).json({
            status : 'success',
            message : 'Company created successfully!'
        })
    })
});

// fetch company details
exports.getAllCompanyName = catchAsync(async(req, res, next) => {

        const sql = `SELECT id, company_name FROM organisation`;
        con.query(sql, (err, result) => {
            if(err) return next(new AppError('Something went wrong!', 400));
            if(result.length == 0) return next(new AppError('No Records Found!', 204));

            res.status(200).json({
                status : 'success',
                data : result
            })
        })
});

//  create company with branch
exports.companyWithBranch = catchAsync(async(req, res, next) => {

    const comp_name = await req.body.comp_name;
    const branch_name = await req.body.branch_name;

    const sql = `INSERT INTO organisation_branch(company_name, branch_name) VALUES(?,?)`;
    const val = [comp_name, branch_name];

    con.query(sql, val, (err, result) => {
        
        if(err) return next(new AppError('Something went wrong!!', 400));
        if(result.affectedRows == 0) return next(new AppError('No Records Add!!', 400));

        res.status(201).json({
            status : 'success',
            message: 'Branch added successfully with company name!'
        })
    })

})

// fetch company with branch details
exports.getAllCompanyWithBranch = catchAsync(async(req, res, next) =>{

    const sql = `SELECT * FROM organisation_branch`;
    con.query(sql, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length == 0) return next(new AppError('No Records Found!', 204));

        res.status(200).json({
            status: 'success',
            data: result
        })
    })
})

// create branch head
exports.addBranchHead = catchAsync(async(req, res, next) => {
    const comp_name = await req.body.comp_name;
    const branch_name = await req.body.branch_name;
    const branch_head = await req.body.branch_head;

    const sql = `INSERT INTO org_branch_head(comp_name, branch_name, branch_head) VALUES(?,?,?)`;
    const val = [comp_name, branch_name, branch_head];

    con.query(sql, val, (err, result) => {
        
        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.affectedRows == 0) return next(new AppError('No Records Add!!', 400));

        res.status(201).json({
            status : 'success',
            message : 'Branch head add successfully!!'
        })
    })
})

// Get all branch head
exports.getAllBranchHead = catchAsync(async(req, res, next) => {

    const sql = `SELECT * FROM org_branch_head`;
    con.query(sql, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length == 0) return next(new AppError('No Records Found!', 204));

        res.status(200).json({
            status: 'success',
            data: result
        })
    })
})

// Create add branch hr
exports.addBranchHr = catchAsync(async(req, res, next) => {

    const comp_name = await req.body.comp_name;
    const branch_name = await req.body.branch_name;
    const branch_head = await req.body.branch_head;
    const hr_phone = await req.body.hr_phone;
    const branch_hr = await req.body.branch_hr;

    const sql = `INSERT INTO org_branch_hr(comp_name, branch_name, branch_head, hr_phone, branch_hr) VALUES(?,?,?,?,?)`;
    const val = [comp_name, branch_name, branch_head, hr_phone, branch_hr];

    con.query(sql, val, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.affectedRows == 0) return next(new AppError('No Records Add!!', 400));

        res.status(201).json({
            status : 'success', 
            message : 'Branch HR successfully Added!!'
        })
    })
})

// Get all branch Hr
exports.getAllBranchHr = catchAsync(async(req, res, next) => {

    const sql = `SELECT * FROM org_branch_hr`

    con.query(sql, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length == 0) return next(new AppError('No Records Found!', 204));

        res.status(200).json({
            status : 'success',
            data : result
        })
    })  
})


// get branch with company name
exports.getBranchWithCompanyName = catchAsync(async(req, res, next) => {

    const comp_name = await req.body.comp_name;

    const sql = `SELECT branch_name FROM organisation_branch WHERE company_name = ?`;
    con.query(sql, comp_name, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length == 0) return next(new AppError('No Records Found!', 204));
        
        res.status(200).json({
            status : 'success',
            data : result
        })
    })
})

//  Get all hr with company name and branch name
exports.getHrWithCompanyAndBranchName = catchAsync(async(req, res, next) => {

    const comp_name = await req.body.comp_name;
    const branch_name = await req.body.branch_name;

    const sql = `SELECT branch_head FROM org_branch_head WHERE comp_name=? AND branch_name=?`;
    const val = [comp_name, branch_name];

    con.query(sql, val, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length == 0) return next(new AppError('No Records Found!', 204));

        res.status(200).json({
            status: 'success',
            data: result
        })
    })
})

exports.addDepartment = catchAsync(async(req, res, next) => {

    const comp_name = await req.body.comp_name;
    const branch_name = await req.body.branch_name;
    const depart_name = await req.body.depart_name;

    const sql = `INSERT INTO org_department(company_name, branch_name, department_name) VALUES(?,?,?)`;
    const val = [comp_name, branch_name, depart_name];

    con.query(sql, val, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.affectedRows == 0) return next(new AppError('No Records Add!!', 400));

        res.status(201).json({
            status: 'success',
            message: 'Department name added successfully!!'
        })

    })
})

exports.getAllDepartment = catchAsync(async(req, res, next) => {

    const sql = `SELECT * FROM org_department`;
    con.query(sql, (err, result) => {
        
        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length == 0) return next(new AppError('No Records Found!', 204));

        res.status(200).json({
            status: 'success',
            data: result
        })

    })
})

exports.getDepartmentWithCompanyBranchName = catchAsync(async(req, res, next) => {

    const compName = await req.body.comp_name;
    const branchName  = await req.body.branch_name;

    const sql = `SELECT department_name FROM org_department WHERE company_name=? AND branch_name=?`;
    const val = [compName, branchName];

    con.query(sql, val, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length == 0) return next(new AppError('No Records Found!', 204));

        res.status(200).json({
            status : 'success',
            data : result
        })
        
    })
})


//Add assets
exports.addAssets = catchAsync(async(req, res, next) => {

    const items = await req.body.items;
    const model_no = await req.body.model_no;
    const desc = await req.body.desc;

    const sql = `INSERT INTO assets(item_name,model_no,description) VALUES(?,?,?)`;
    const val = [items, model_no, desc];

    con.query(sql, val, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.affectedRows == 0) return next(new AppError('No Records Add!!', 400));

        res.status(201).json({
            status: 'success',
            message: 'Assets added successfully!!'
        })

    })
})

//get All assets
exports.getAllAssets = catchAsync(async(req, res, next) => {

    const sql = `SELECT * FROM assets`;
    con.query(sql, (err, result) => {
        
        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length == 0) return next(new AppError('No Records Found!', 204));

        res.status(200).json({
            status: 'success',
            data: result
        })

    })
})