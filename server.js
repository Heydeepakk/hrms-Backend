const dotenv = require("dotenv");
dotenv.config({ path : './config.env' })

const app = require('./app');

// port adress
const port = process.env.PORT || 3000;

// port connection
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`)
});


// unhandled rejection
process.on('unhandledRejection', err => {
    console.log('Unhandled Rejection! Shutting Down!');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1); 
    });
})