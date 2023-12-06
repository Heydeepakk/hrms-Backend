const fs = require('fs');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const con = require('../utils/db');



exports.getLeaves = catchAsync(async(req, res,next) => {

    const sql = `SELECT l.*,e.name FROM leaves as l left join employee as e on l.emp_id=e.emp_id  `

    con.query(sql, (err, result) => {

        if(err) return next(new AppError('Something went wrong!', 400));
        if(result.length == 0) return next(new AppError('No Records Found!', 204));


        res.status(200).json({
            status: 'success',
            data: result
        })
    })
})