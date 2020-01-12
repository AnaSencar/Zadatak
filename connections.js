const mysql = require('mysql2');
const { promisify } = require('util');

var mysqlConnection = mysql.createConnection({
    host : "localhost",
    user : "admiral",
    password : "baza",
    database : "admiral_2020_zadatak",
    multipleStatements : true
});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("Connected");
    }
    else{
        console.log("Connection failed");
    }
});

const query = promisify(mysqlConnection.query).bind(mysqlConnection);

exports.query = query;
