const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//process.env.DATABASE_URL
const url = "mongodb://localhost:27017";
dotenv.config();
//connect to DB process.env.DATABASE_URL
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to DB')
})


app.listen(3000, () => console.log('Server running......'));