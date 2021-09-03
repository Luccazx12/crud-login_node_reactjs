const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3307, 
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
    const sql = 'CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL AUTO_INCREMENT , `username` VARCHAR(20) NOT NULL, `password` VARCHAR(255) NOT NULL, `cpf` CHAR(14) NOT NULL, `departament` VARCHAR(20), `gerencia` TINYINT(1) DEFAULT 0, `image_user` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;';
    conn.query(sql, function(error, result, fields){
        if(error) return console.log(error);
        console.log("A tabela de usuários foi criada")
    });
}
function addRows(conn){
    const sql = "INSERT INTO users (id, username, password, cpf , departament, image_user) VALUES (NULL, 'admin', 'admin', '123.123.123-12', 'Nenhum', 'uploads/user-img/default/usuario.png');"
    conn.query(sql, function(error, result, fields){
        if(error) return console.log(error);
        console.log("Adicionado registro ADMIN!")
    });
}

