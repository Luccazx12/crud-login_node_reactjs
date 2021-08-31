const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306, 
    user: 'root',
    database: 'crud777'
});

connection.connect(function(err) {
    if(err) return console.log(err);
    console.log('conectou!');
    createTable(connection);
    addRows(connection);
});

function createTable(conn){
    const sql = 'CREATE TABLE IF NOT EXISTS users (id int NOT NULL AUTO_INCREMENT, username varchar(20) NOT NULL, password varchar(500) not null,cpf char(14) NOT NULL, departament varchar(20), gerencia tinyint(1) DEFAULT 0, image_user varchar(100), PRIMARY KEY (id));';
    conn.query(sql, function(error, result, fields){
        if(error) return console.log(error);
        console.log("A tabela de usuários foi criada")
    });
}