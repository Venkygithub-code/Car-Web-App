const express = require('express')
const mongoose = require('mongoose')
const db = require('./createDB/database')
const path = require('path')
const bodyParser = require('body-parser')
const router = require('./routers/router')

const app = express();


const bodyParserMW = bodyParser.urlencoded({ extended: true })
app.use(express.static(path.join(__dirname, 'static'))) /// built in middelware


// this return ejs
app.set('view engine', 'ejs');
app.set('views', 'views')  // default


// Error-handling middleware
app.use((err, req, res, next) => {
    if (!err) { return next(); }
    res.status(500);
    res.send('500: Internal server error');
});


app.use(router)  //  use router middleware


app.get('/login', (req, res, next) => {
    if (req.cookies.id_user === "" || req.cookies.id_user === null) {
        res.render('authentication');
    } else {
        res.redirect('/home')
    }
})


app.get('/log_out', (req, res) => {
    res.cookie('id_user', "")
    res.redirect('/login')
})



app.listen(5000, () => { console.log("Server Is Running") })