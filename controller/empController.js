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