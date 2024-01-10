const catchAsync =  require('../utils/catchAsync');
const AppError = require('../utils/appError');
const con = require('../utils/db');

// company create
// exports.createCompanyName = catchAsync(async(req, res, next)  => {

//     const comp_name = await req.body.comp_name;

//     const sql = `INSERT INTO organisation(company_name) VALUES(?)`;
//     con.query(sql, comp_name, (err, result) => {
        
//         if(err) return next(new AppError('Something went wrong! Please try again later!', 400))
//         if(result.affectedRows == 0) return next(new AppError('Please fill the Inputs!', 400))

//         res.status(201).json({
//             status : 'success',
//             message : 'Company created successfully!'
//         })
//     })
// });

//Add company and branch setup
exports.addCompanyBranch = catchAsync(async(req, res, next)  => {

    const company_name = await req.body.company_name;
    const branch_name = await req.body.branch_name;
    const branch_address = await req.body.branch_address;
    const city = await req.body.city;
    const state = await req.body.state;
    const branch_landmark = await req.body.branch_landmark;



    const sql = `INSERT INTO company_setup(company_name,branch_name,branch_address,city,state,branch_landmark) VALUES(?,?,?,?,?,?)`;
    con.query(sql,[company_name,branch_name,branch_address,city,state,branch_landmark], (err, result) => {
        
        if(err) return next(new AppError('Something went wrong! Please try again later!', 400))
        if(result.affectedRows == 0) return next(new AppError('Please fill the Inputs!', 400))

        res.status(201).json({
            status : 'success',
            message : 'Created successfully!'
        })
    })
});


// fetch company details
// exports.getAllCompanyName = catchAsync(async(req, res, next) => {

//         const sql = `SELECT id, company_name FROM organisation`;
//         con.query(sql, (err, result) => {
//             if(err) return next(new AppError('Something went wrong!', 400));
//             if(result.length == 0) return next(new AppError('No Records Found!', 204));

//             res.status(200).json({
//                 status : 'success',
//                 data : result
//             })
//         })
// });
exports.getAllCompanyName = catchAsync(async(req, res, next) => {

    const sql = `SELECT DISTINCT(company_name),GROUP_CONCAT(id) as id FROM company_setup GROUP by company_name`;
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
// exports.companyWithBranch = catchAsync(async(req, res, next) => {

//     const comp_name = await req.body.comp_name;
//     const branch_name = await req.body.branch_name;

//     const sql = `INSERT INTO organisation_branch(company_name, branch_name) VALUES(?,?)`;
//     const val = [comp_name, branch_name];

//     con.query(sql, val, (err, result) => {
        
//         if(err) return next(new AppError('Something went wrong!!', 400));
//         if(result.affectedRows == 0) return next(new AppError('No Records Add!!', 400));

//         res.status(201).json({
//             status : 'success',
//             message: 'Branch added successfully with company name!'
//         })
//     })

// })

// // fetch company with branch details
// exports.getAllCompanyWithBranch = catchAsync(async(req, res, next) =>{

//     const sql = `SELECT * FROM organisation_branch`;
//     con.query(sql, (err, result) => {

//         if(err) return next(new AppError('Something went wrong!', 400));
//         if(result.length == 0) return next(new AppError('No Records Found!', 204));

//         res.status(200).json({
//             status: 'success',
//             data: result
//         })
//     })
// })

// create branch head
// exports.addBranchHead = catchAsync(async(req, res, next) => {
//     const comp_name = await req.body.comp_name;
//     const branch_name = await req.body.branch_name;
//     const branch_head = await req.body.branch_head;

//     const sql = `INSERT INTO org_branch_head(comp_name, branch_name, branch_head) VALUES(?,?,?)`;
//     const val = [comp_name, branch_name, branch_head];

//     con.query(sql, val, (err, result) => {
        
//         if(err) return next(new AppError('Something went wrong!', 400));
//         if(result.affectedRows == 0) return next(new AppError('No Records Add!!', 400));

//         res.status(201).json({
//             status : 'success',
//             message : 'Branch head add successfully!!'
//         })
//     })
// })

// Get all branch head
// exports.getAllBranchHead = catchAsync(async(req, res, next) => {

//     const sql = `SELECT * FROM org_branch_head`;
//     con.query(sql, (err, result) => {

//         if(err) return next(new AppError('Something went wrong!', 400));
//         if(result.length == 0) return next(new AppError('No Records Found!', 204));

//         res.status(200).json({
//             status: 'success',
//             data: result
//         })
//     })
// })

// Create add branch hr
// exports.addBranchHr = catchAsync(async(req, res, next) => {

//     const comp_name = await req.body.comp_name;
//     const branch_name = await req.body.branch_name;
//     const branch_head = await req.body.branch_head;
//     const hr_phone = await req.body.hr_phone;
//     const branch_hr = await req.body.branch_hr;

//     const sql = `INSERT INTO org_branch_hr(comp_name, branch_name, branch_head, hr_phone, branch_hr) VALUES(?,?,?,?,?)`;
//     const val = [comp_name, branch_name, branch_head, hr_phone, branch_hr];

//     con.query(sql, val, (err, result) => {

//         if(err) return next(new AppError('Something went wrong!', 400));
//         if(result.affectedRows == 0) return next(new AppError('No Records Add!!', 400));

//         res.status(201).json({
//             status : 'success', 
//             message : 'Branch HR successfully Added!!'
//         })
//     })
// })
exports.addBranchHr = catchAsync(async(req, res, next) => {

    const branch_id = await req.body.branch_id;
    const branchhr = await req.body.branchhr;

    for(let i =0;i<branchhr.length;i++){
        let e_id = branchhr[i].empId;
        let hr = branchhr[i].name;
        const sql = `INSERT INTO human_resource(branch_id, emp_id, hr_name) VALUES(?,?,?)`;
        const val = [branch_id, e_id, hr];

        con.query(sql, val, (err, result) => {

            if(err) return next(new AppError('Something went wrong!', 400));
            if(result.affectedRows == 0) return next(new AppError('No Records Add!!', 400));

        })
    }
    res.status(201).json({
        status : 'success', 
        message : 'Successfully Added!!'
    })
})

// Get all branch Hr
exports.getAllBranchHr = catchAsync(async(req, res, next) => {

    const sql = `SELECT * FROM human_resource`

    con.query(sql, (err, result) => {
     
        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length === 0) return next(new AppError('No Records Found!', 400));

        res.status(200).json({
            status : 'success',
            data : result
        })
    })  
})

//get employee with branch
exports.getEmployeeWithBranch = catchAsync(async(req, res, next) => {

    const company_name = await req.body.company_name;
    const branch_name = await req.body.branch_name;


    const sql = `SELECT emp_id,name FROM employee WHERE company = ? AND branch =?`;
    con.query(sql, [company_name,branch_name], (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length == 0) return next(new AppError('No Records Found!', 204));
        
        res.status(200).json({
            status : 'success',
            data : result
        })
    })
})


// get branch with company name
// exports.getBranchWithCompanyName = catchAsync(async(req, res, next) => {

//     const comp_name = await req.body.comp_name;

//     const sql = `SELECT branch_name FROM organisation_branch WHERE company_name = ?`;
//     con.query(sql, comp_name, (err, result) => {

//         if(err) return next(new AppError('Something went wrong!', 400));
//         if(result.length == 0) return next(new AppError('No Records Found!', 204));
        
//         res.status(200).json({
//             status : 'success',
//             data : result
//         })
//     })
// })
exports.getBranchWithCompanyName = catchAsync(async(req, res, next) => {

    const comp_name = await req.body.comp_name;

    const sql = `SELECT id,branch_name FROM company_setup WHERE company_name = ?`;
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

// Add Departments
// exports.addDepartment = catchAsync(async(req, res, next) => {

//     const comp_name = await req.body.comp_name;
//     const branch_name = await req.body.branch_name;
//     const depart_name = await req.body.depart_name;

//     const sql = `INSERT INTO org_department(company_name, branch_name, department_name) VALUES(?,?,?)`;
//     const val = [comp_name, branch_name, depart_name];

//     con.query(sql, val, (err, result) => {

//         if(err) return next(new AppError('Something went wrong!', 400));
//         if(result.affectedRows == 0) return next(new AppError('No Records Add!!', 400));

//         res.status(201).json({
//             status: 'success',
//             message: 'Department name added successfully!!'
//         })

//     })
// })
exports.addDepartment = catchAsync(async(req, res, next) => {

    const branch_id = await req.body.branch_id;
    const department_name = await req.body.department_name;

    for(let i=0;i<department_name.length;i++){
        let d_name = department_name[i];
        const sql = `INSERT INTO department_setup(branch_id, department_name) VALUES(?,?)`;
        const val = [branch_id, d_name];

        con.query(sql, val, (err, result) => {

            if(err) return next(new AppError('Something went wrong!', 400));
            if(result.affectedRows == 0) return next(new AppError('No Records Add!!', 400));

        })
    }
    res.status(201).json({
        status: 'success',
        message: 'Department name added successfully!!'
    })
})


//  Get all Departments
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

// Get department with company name and branch name
exports.getDepartmentWithCompanyBranchName = catchAsync(async(req, res, next) => {

    const compName = await req.body.comp_name;
    const branchName  = await req.body.branch_name;

    const sql = `SELECT ds.department_name FROM department_setup as ds join company_setup as cs on cs.id=ds.branch_id WHERE cs.company_name=? AND cs.branch_name=?`;
    const val = [compName, branchName];

    con.query(sql, val, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length == 0) return next(new AppError('No Records Found!', 400));
        if(result.length<=0){
            res.status(200).json({
                status : '204',
            })        
        }else{
            res.status(200).json({
                status : 'success',
                data : result
            })

        }

        
    })
})


//Add company assets
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

//get All company assets 
exports.getAllAssets = catchAsync(async(req, res, next) => {

    const sql = `SELECT * FROM assets where status!='In-Active' ORDER BY id DESC`;
    con.query(sql, (err, result) => {
        
        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length == 0) return next(new AppError('No Records Found!', 204));

        res.status(200).json({
            status: 'success',
            data: result
        })

    })
})

//In active company Assets
exports.deleteAsset = catchAsync(async(req, res, next) => {

    const sql = `Update assets SET status = 'In-Active' where id = ?`;
    const val = [req.body.id];

    con.query(sql,val, (err, result) => {
        
        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length == 0) return next(new AppError('No Records Found!', 204));

        res.status(200).json({
            status: 'success',
            data: 'Asset deleted successfully!!!'
        })

    })
})

// Get Org Setup details
exports.getOrgSetup = catchAsync(async(req, res, next) => {

    const sql = `SELECT id,company_name,branch_name,branch_address,city,state,branch_landmark from company_setup`;
    con.query(sql, (err, result) => {
        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length == 0) return next(new AppError('No Records Found!', 204));

        result.map((r,index)=>{
            let query = `SELECT (SELECT GROUP_CONCAT(department_name SEPARATOR ', ') as department_name FROM department_setup WHERE branch_id=?) as department_name,
            (SELECT GROUP_CONCAT(hr_name SEPARATOR ', ') as hr_name FROM human_resource WHERE branch_id=?) as hr_name`;
            let values = [r.id,r.id];
            con.query(query,values, (err, d_result) => {

                if(d_result){
                    result[index].department_name = d_result[0].department_name;
                    result[index].hr_name = d_result[0].hr_name;
                }
                if(result[index].department_name == null){
                    result[index].department_name = '-';
                }
                if(result[index].hr_name == null){
                    result[index].hr_name = '-';
                }

                if ((index+1) === result.length) {
                    res.status(200).json({
                        status: 'success',
                        data: result
                    });
                }
            })

        })
    })
});
