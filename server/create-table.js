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
    const sql = 'CREATE TABLE IF NOT EXISTS users (id int NOT NULL AUTO_INCREMENT, usuario varchar(100) NOT NULL, password varchar(20) not null,cpf char(11) NOT NULL, PRIMARY KEY (id));';
    conn.query(sql, function(error, result, fields){
        if(error) return console.log(error);
        console.log("A tabela clientes foi criada")
    });
}

function addRows(conn){
    const sql = "INSERT INTO users (nome,cpf) VALUES ?";
    const values= [
        ['Patricia', '123456789'],
        ['Pedro da Silva', '987654321'],
        ['Michele Lorena', '147895623']
    ];
    conn.query(sql, [values], function(error, result, fields){
        if(error) return console.log(error);
        console.log('Adicionou registros!');
        conn.end(); //fechar conexão
    });
}