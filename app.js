const express = require('express');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const fileupload = require('express-fileupload');

const app = express();
const port = process.env.PORT || 5002;


app.use(bodyparser.urlencoded({ extended : false }));
const urlencodedparser = bodyparser.urlencoded({ extended : false });
app.use(bodyparser.json());

app.use(fileupload());

app.use(express.static('public'));
//app.use('.../techware_dashhboard/public/uploads', express.static('images'));

const routes = require('./server/routes/routes');
app.use('/', routes);

const handlebars = exphbs.create ({ extname : '.hbs', });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');


const pool = mysql.createPool({
    connectionLimit : 100,
    host            : 'localhost',
    user            : 'admin',
    password        : 'admin',
    database        : 'Techware_Blogs'
});

pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('connection id' + connection.threadId);
});


app.listen(port, () => console.log(`listening to port ${port}`));