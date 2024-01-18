// core modules
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const con = require('../utils/db');

exports.login = catchAsync(async(req, res, next) => {

    const phone = await req.body.phone;
    const empId = await req.body.empId;

    const sql = `SELECT emp_id, phone FROM admin WHERE emp_id='${empId}' AND phone='${phone}' AND status='Active'`;
    con.query(sql, (err, result) => {  
        
        if(err) return next(new AppError('Something went wrong!!', 400))
        if(result.length == 0) return next(new AppError('Invalid Phone Number!', 400));

        const rand = Math.floor(Math.random() * 9000 + 1000);

        const sql2 = `UPDATE admin SET otp=? WHERE phone='${phone}'`;
        con.query(sql2, rand, (err, result) => {            
            
            if(err) return next(new AppError('Something went wrong! OTP sent failed!!', 400));

            // Sent OTP
            // const req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");
            // req.headers({
            //     "authorization": "hp6KLBVI8cAvnSu0yMXPk4F17JQUjH9moOC2Dzd3WftqaZsx5lKgEx4zbCIQHPjpnO7AVdsoYRXi2Z15"
            // });
            // req.form({
            //     "variables_values": `${rand}`,
            //     "route": "otp",
            //     "numbers": `${phone}`,
            //   });

            //   req.end(res => {});

            res.status(200).json({
                status : 'success',
                message : 'OTP sent successfully!'
            })
        })
    })
});

exports.employeeLogin = catchAsync(async(req, res, next) => {

    const phone = await req.body.phone;
    const empId = await req.body.empId;

    const sql = `SELECT emp_id, official_mobile FROM employee WHERE emp_id='${empId}' AND official_mobile='${phone}' AND status='Active'`;
    con.query(sql, (err, result) => {  
        
        if(err) return next(new AppError('Something went wrong!!', 400))
        if(result.length == 0) return next(new AppError('Invalid Phone Number!', 400));

        const rand = Math.floor(Math.random() * 9000 + 1000);

        const sql2 = `UPDATE employee SET otp=? WHERE official_mobile='${phone}'`;
        con.query(sql2, rand, (err, result) => {            
            
            if(err) return next(new AppError('Something went wrong! OTP sent failed!!', 400));
            if(result.length == 0) return next(new AppError('OTP not generated! PLease try again !', 400));
            // Sent OTP
            // const req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");
            // req.headers({
            //     "authorization": "hp6KLBVI8cAvnSu0yMXPk4F17JQUjH9moOC2Dzd3WftqaZsx5lKgEx4zbCIQHPjpnO7AVdsoYRXi2Z15"
            // });
            // req.form({
            //     "variables_values": `${rand}`,
            //     "route": "otp",
            //     "numbers": `${phone}`,
            //   });

            //   req.end(res => {});

            res.status(200).json({
                status : 'success',
                message : 'OTP sent successfully!'
            })
        })
    })
});

exports.validateOtp = catchAsync(async(req, res, next) => {

    const phone = await req.body.phone;
    const otp = await req.body.otp;

    const sql = `SELECT * FROM admin WHERE phone='${phone}' `;
    con.query(sql, (err, result) => {

        if(result.length > 0){
            result.forEach(el => {
                if(otp == el.otp){
    
                    res.status(200).json({
                        status : 'success',
                        message : 'Successfully Login!',
                        data : el
                        // data : {
                        //     phone: el.phone,
                        //     emp_id: el.emp_id
                        // }
                    })
                }else{
                    return next(new AppError('OTP Invalid! Please try again later!!', 400))
                }
            })
        }
        
    })

})

exports.empValidateOtp = catchAsync(async(req, res, next) => {

    const phone = await req.body.phone;
    const otp = await req.body.otp;

    const sql = `SELECT * FROM employee WHERE official_mobile='${phone}' `;
    con.query(sql, (err, result) => {

        if(result.length > 0){
            result.forEach(el => {
                if(otp == el.otp){
    
                    res.status(200).json({
                        status : 'success',
                        message : 'Successfully Login!',
                        data : el
                        // data : {
                        //     phone: el.phone,
                        //     emp_id: el.emp_id
                        // }
                    })
                }else{
                    return next(new AppError('OTP Invalid! Please try again later!!', 400))
                }
            })
        }
        
    })

})