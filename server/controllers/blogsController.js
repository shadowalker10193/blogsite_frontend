const mysql = require('mysql');
const fileupload = require('express-fileupload');

//connection pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : 'localhost',
    user            : 'admin',
    password        : 'admin',
    database        : 'Techware_Blogs'
});

// exports.index = (req, res) => {
//     res.render('techwareindex');
// };

exports.viewblogs = (req, res) => {

    pool.getConnection((err, connection) => {

        if(err) throw err;
        console.log('connected as id' + connection.threadId);

        connection.query('SELECT * FROM blogs', (err, rows) => {

            if(!err){
                res.render('techwareindex', {rows});
            } else {
                console.log(err);
            }
            console.log('the data from user table: \n', rows);
        });
    });

};

exports.viewsingleblog = (req, res) => {

    pool.getConnection((err, connection) => {

        if(err) throw err;
        console.log('connected as id' + connection.threadId);

        connection.query('SELECT * FROM blogs WHERE idblogs = ?', [req.params.idblogs], (err, rows) => {

            if(!err){
                res.render('tech-single', { rows });
            } else {
                console.log(err);
            }
            console.log('the data from user table: \n', rows);
        });
    });
};