// core modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const globalErrorController = require('./controller/errorController');
const authRoutes = require('./router/authRoutes');
const orgRoutes = require('./router/orgRoutes');
const empRoutes = require('./router/empRoutes');
const leaveRoutes = require('./router/leaveRoutes')
//ankit
// start app
const app = express();
// Development Logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '100mb' })); //This is for Add Something in DB
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.options('*', cors());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/org', orgRoutes);
app.use('/api/v1/employee', empRoutes)
app.use('/api/v1/leave', leaveRoutes)



// this middleware used for all unhandled routes that we not created
app.all('*', (req,res,next) => {
    // res
    //     .status(404)
    //     .json({
    //         status: 'Fail',
    //         message: 'This route is not available yet'
    //     });
    next(new AppError('This route is not available yet', 404));
})

app.use(globalErrorController);

module.exports = app;