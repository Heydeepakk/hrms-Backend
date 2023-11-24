const fs = require('fs');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const con = require('../utils/db');

// add Emloyee
exports.addEmployee = catchAsync(async(req, res, next) => {

    const name = await req.body.name
    const company = await req.body.company
    const branch = await req.body.branch
    const department = await req.body.department
    const designation = await req.body.designation
    const dob = await req.body.dob
    const doj = await req.body.doj
    const ctc = await req.body.ctc
    const reportingManager = await req.body.reporting_manager    
    const officialEmail = await req.body.official_email
    const officialMobile = await req.body.official_mobile
    const address = await req.body.address
    const district = await req.body.district
    const state = await req.body.state
    const pan = await req.body.pan
    const aadhaar = await req.body.aadhaar
    const gender = await req.body.gender
    const experienceYear = await req.body.experience_year
    const experienceMonth = await req.body.experience_month
    const personal_mobile = await req.body.personal_mobile


    const empSql = `SELECT id FROM employee ORDER BY id DESC LIMIT 1`;
    con.query(empSql, (err, result) => {
        
        if(err) return next(new AppError('Something went wrong!', 400));

        if(result.length == 0){
            const empId = 'Emp00' + 1;

            let image = req.body.image;
            let base64Data = image.replace("data:image/png;base64,", "");
            let rand = Math.floor(Math.random() * 9000000 + 1000000)
            // store Image
            fs.writeFile('uploads/' + rand + '.png', base64Data, 'base64', (err) => {
                if(err) return next(new AppError('Image not uploaded!', 400))
            })
            
            let uploadFile = '';
            if(image){
                console.log('yes');
                uploadFile = process.env.IMAGE_URL + rand + '.png';
            }

            const sql = `INSERT INTO employee(name,emp_id,company,branch,department,designation,dob,doj,ctc,reporting_manager,official_email,official_mobile,address,district,state,pan,aadhaar,gender,experience_year,experience_month,image,personal_mobile) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
            const val = [name,empId,company,branch,department,designation,dob,doj,ctc,reportingManager,officialEmail,officialMobile,address,district,state,pan,aadhaar,gender,experienceYear, experienceMonth,uploadFile,personal_mobile]

            con.query(sql, val, (err, result) => {

                if(err) return next(new AppError('Something went wrong!!', 400));
                if(result.affectedRows == 0) return next(new AppError('No Records Add!!', 400));

                res.status(201).json({
                    status : 'success',
                    message : 'Employee Added Successfully'
                })
            })


        }else{
            result.forEach(el => {
                let u_id = el.id + 1;
                let empId = 'Emp00' + u_id;       
                
                let image = req.body.image;
                let base64Data = image.replace("data:image/png;base64,", "");
                let rand = Math.floor(Math.random() * 9000000 + 1000000)
                // store Image
                fs.writeFile('uploads/' + rand + '.png', base64Data, 'base64', (err) => {
                    if(err) return next(new AppError('Image not uploaded!', 400))
                })

                let uploadFile = '';
                if(image){
                    console.log('yes');
                    uploadFile = process.env.IMAGE_URL + rand + '.png';
                }

                const sql = `INSERT INTO employee(name,emp_id,company,branch,department,designation,dob,doj,ctc,reporting_manager,official_email,official_mobile,address,district,state,pan,aadhaar,gender,experience_year,experience_month,image,personal_mobile) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
                const val = [name,empId,company,branch,department,designation,dob,doj,ctc,reportingManager,officialEmail,officialMobile,address,district,state,pan,aadhaar,gender,experienceYear, experienceMonth,uploadFile,personal_mobile]

                con.query(sql, val, (err, result) => {

                    if(err) return next(new AppError('Something went wrong!!', 400));
                    if(result.affectedRows == 0) return next(new AppError('No Records Add!!', 400));

                    res.status(201).json({
                        status : 'success',
                        message : 'Employee Added Successfully'
                    })
                })
            });
        }
    })

})


//  get all employee
exports.getAllEmployee = catchAsync(async(req, res, next) => {

    const sql = `SELECT * FROM employee`;
    con.query(sql, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length == 0) return next(new AppError('No Records Found!', 204));

        res.status(200).json({
            status : 'success',
            data : result
        })
    })
})

exports.getEmployeeById = catchAsync(async(req, res, next) => {

    const empId = await req.body.emp_id;

    const sql = `SELECT * FROM employee WHERE emp_id=?`;
    const val = [empId]

    con.query(sql, val, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length == 0) return next(new AppError('No Records Found!', 204));

        res.status(200).json({
            status : 'success',
            data : result
        })

    })
})

//get All left assets 
exports.getAssets = catchAsync(async(req, res, next) => {

    const sql = `SELECT * FROM assets where status = 'Active' ORDER BY id DESC`;
    con.query(sql, (err, result) => {
        
        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length == 0) return next(new AppError('No Records Found!', 204));

        res.status(200).json({
            status: 'success',
            data: result
        })

    })
})


//Assign Asset
exports.assignAsset = catchAsync(async(req, res, next) => {

    const asset_id = await req.body.asset_id;
    const emp_id = await req.body.emp_id;
    //insert in assign assets because of history
    const sql = `INSERT INTO assign_assets(asset_id,emp_id) VALUES(?,?)`;
    const val = [asset_id, emp_id];

    con.query(sql, val, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.affectedRows == 0) return next(new AppError('No Records Add!!', 400));
        
        //update in assets to make it occupied 
        const sql1 = `UPDATE assets SET status = 'Occupied' where id = ?`;
        const val1 = [asset_id];
        con.query(sql1, val1, (err, result) => {

            if(err) return next(new AppError('Something went wrong!', 400));
            if(result.affectedRows == 0) return next(new AppError('No Records Add!!', 400));

            res.status(201).json({
                status: 'success',
                message: 'Assets added successfully!!'
            })
    })

    })
})

//get assigned assets
exports.getAssignAssets = catchAsync(async(req, res, next) => {
    const sql = `SELECT a.* FROM assign_assets as aas right join assets as a  on aas.asset_id=a.id where aas.status = 'Active' AND aas.emp_id = ? ORDER BY id DESC`;
    const val = [req.body.emp_id]
    con.query(sql,val, (err, result) => {
        
        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length == 0) return next(new AppError('No Records Found!', 204));

        res.status(200).json({
            status: 'success',
            data: result
        })

    })
})

//Dis-Assign Asset
exports.disAssignAsset = catchAsync(async(req, res, next) => {

    const asset_id = await req.body.asset_id;
    //Dis assigning assets because of history
    const sql = `UPDATE assign_assets SET status='Dis-assign' where asset_id = ?`;
    const val = [asset_id];

    con.query(sql, val, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.affectedRows == 0) return next(new AppError('Error !!', 400));
        
        //update in assets to make it Active 
        const sql1 = `UPDATE assets SET status = 'Active' where id = ?`;
        const val1 = [asset_id];
        con.query(sql1, val1, (err, result) => {

            if(err) return next(new AppError('Something went wrong!', 400));
            if(result.affectedRows == 0) return next(new AppError('Error !!', 400));

            res.status(201).json({
                status: 'success',
                message: 'Dis-Assigned!!'
            })
    })
    })
})

exports.addRole = catchAsync(async(req, res, next) => {

    const role = await req.body.role

    const sql = `INSERT INTO emp_role(emp_role) VALUES(?)`
    const val = [role]

    con.query(sql, val, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.affectedRows == 0) return next(new AppError('No Records Add!!', 400));

        res.status(201).json({
            status : 'success',
            message : 'Employe role added!'
        })

    })
})

exports.getRole = catchAsync(async(req, res,next) => {

    const sql = `SELECT * FROM emp_role`

    con.query(sql, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length == 0) return next(new AppError('No Records Found!', 204));


        res.status(200).json({
            status: 'success',
            data: result
        })
    })
})

exports.empRoleUpdate = catchAsync(async(req, res, next) => {

    const role = req.body.role
    const empId = req.body.empId
    
    if(role.length > 0){
        var arrayAsString = role.join(', ');
    }else{
        var arrayAsString = role.join('');
    }
    
    const sql = `UPDATE employee SET role_status=? WHERE emp_id=?`
    const val = [arrayAsString, empId];

    con.query(sql, val, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.affectedRows == 0) return next(new AppError('No Records Add!!', 400));

        res.status(201).json({
            status : 'success',
            message : 'Employee Role updated!'
        })
    })
})


//add awards 
exports.addAwards = catchAsync(async(req, res, next) => {

    const awards = await req.body.awards

    const sql = `INSERT INTO awards(awards) VALUES(?)`
    const val = [awards]

    con.query(sql, val, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.affectedRows == 0) return next(new AppError('No Records Add!!', 400));

        res.status(201).json({
            status : 'success',
            message : 'Award added!'
        })

    })
})

//get Awards
exports.getAwards = catchAsync(async(req, res,next) => {

    const sql = `SELECT * FROM awards`

    con.query(sql, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length == 0) return next(new AppError('No Records Found!', 204));


        res.status(200).json({
            status: 'success',
            data: result
        })
    })
})

//add awards to emp
exports.empAwardsUpdate = catchAsync(async(req, res, next) => {

    const awards = req.body.awards
    const empId = req.body.empId
    
    if(awards.length > 0){
        var arrayAsString = awards.join(', ');
    }else{
        var arrayAsString = awards.join('');
    }
    
    const sql = `UPDATE employee SET awards=? WHERE emp_id=?`
    const val = [arrayAsString, empId];

    con.query(sql, val, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.affectedRows == 0) return next(new AppError('No Records Add!!', 400));

        res.status(201).json({
            status : 'success',
            message : 'Employee Awards updated!'
        })
    })
})

//transfer
exports.empTransfer = catchAsync(async(req, res, next) => {

    const branch = req.body.branch
    const department = req.body.department
    const empId = req.body.empId
    
    const sql = `UPDATE employee SET branch=? , department=? WHERE emp_id=?`
    const val = [branch,department,empId];

    con.query(sql, val, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.affectedRows == 0) return next(new AppError('No Records Add!!', 400));

        res.status(201).json({
            status : 'success',
            message : 'Employee Awards updated!'
        })
    })
})

