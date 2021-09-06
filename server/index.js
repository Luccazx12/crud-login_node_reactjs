const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session");

const PORT = 3002;

const bcrypt = require('bcrypt');
const { validateToken } = require("./middlewares/AuthMiddleware")
const saltRounds = 10;

const multer = require('multer');
const { sign } = require('jsonwebtoken')

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

app.use(cookieParser());
app.use(
	session({
		key: "userId",
		secret: "subscribe",
		resave: false,
		saveUninitialized: false,
		cookie: {
			expires: 60 * 60 * 24,
		},
	})
);

//UPLOAD DE IMAGENS
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		//cb(null, './uploads/');
		cb(null, 'uploads/user-img');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + file.originalname);
	}
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
		cb(null, true);
	} else {
		cb(null, false);
	}
}
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 2048 * 2048 * 5
	},
	fileFilter: fileFilter
});

// configurando body parse para pegar os POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'funcionando' }));
app.use('/', router);
app.use('/uploads', express.static('uploads'));

const conn = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	database: "crud777",
});

// connect to database
conn.connect((err) => {
	if (err) throw err;
	console.log("MySQL conectado!");
	createTable(conn);
});



function createTable(conn){
    const sql = 'CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL AUTO_INCREMENT , `username` VARCHAR(20) NOT NULL, `password` VARCHAR(255) NOT NULL, `cpf` CHAR(14) NOT NULL, `departament` VARCHAR(20), `gerencia` TINYINT(1) DEFAULT 0, `image_user` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;';
    conn.query(sql, function(error, result, fields){
        if(error) return console.log(error);
    });
}

//Rotas Login
app.post("/login", (req, res) => {
	let username = req.body.username;
	let password = req.body.password;

	conn.query(
		"SELECT * FROM users WHERE username = ?;",
		username,
		(err, result) => {
			if (err) {
				res.json({ err: err });
			}
			if (result.length > 0) {
				bcrypt.compare(password, result[0].password, (error, response) => {
					if (response) {
						const accessToken = sign(
							{ username: result[0].username, id: result[0].id, gerencia: result[0].gerencia},
							"importantsecret"
						);
						 res.json({ token: accessToken, username: username, id: result[0].id, gerencia: result[0].gerencia })
						// req.session.user = result;
						// res.json(req.session.user);
						// res.json(result);
					} else {
						res.json({ error: "Wrong username/password combination!" });
					}
				});
			} else {
				res.json({ error: "User doesn't exist" });
			}

		}
	);
});


router.get("/auth", validateToken, (req, res) => {
	res.json(req.user);
  });



//Rotas REGISTRO (Gerencia)

//insert a record
router.post("/users", upload.single('imagem_cliente'), (req, res, next) => {
	let id = req.body.id;
	let username = req.body.username;
	let password = req.body.password;
	let cpf = req.body.cpf;
	let select = req.body.select;
	let imagem = 'uploads/user-img/default/usuario.png';
	if (req.file) {
		imagem = req.file.path;
	}
	if (select === "Escolha um departamento") {
		select = "Nenhum"
	}
	bcrypt.hash(password, saltRounds, (err, hash) => {

		if (err) {
			console.log(err)
		}
		const sqlInsert =
			"INSERT INTO users (id, username, password, cpf , departament, image_user) VALUES (?, ?, ?, ?, ?, ?)";
		conn.query(sqlInsert, [id, username, hash, cpf, select, imagem], (err, result) => {
			if (err) console.log(err)

			//   res.json(
			// 	JSON.stringify({
			// 	  status: 200,
			// 	  error: null,
			// 	  response: "New Record is Added successfully",
			// 	})
			//   );
			console.log(result);
		})
	});
});

router.post("/perfil/:id", upload.single('imagem_cliente'), (req, res, next) => {
	let password = req.body.password;
	let select = req.body.select;
	let imagem = 'uploads/default/usuario.png';
	if (req.file) {
		imagem = req.file.path;
	}
	if (select === "Escolha um departamento") {
		select = "Nenhum"
	}
	bcrypt.hash(password, saltRounds, (err, hash) => {

		if (err) {
			console.log(err)
		}
		const sqlInsert =
		"UPDATE users SET username='" + req.body.username + "', password='" + hash + "', cpf='" + req.body.cpf + "' WHERE id=" + req.params.id;
		conn.query(sqlInsert, (err, result) => {
			if (err) console.log(err)

			//   res.json(
			// 	JSON.stringify({
			// 	  status: 200,
			// 	  error: null,
			// 	  response: "New Record is Added successfully",
			// 	})
			//   );
			console.log(result);
		})
	});
});

// show all records
router.get("/users", validateToken, (req, res) => {
	let sql = "SELECT * FROM users;";
	conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

// show a single record
router.get("/users/id/:id", validateToken, (req, res) => {
	let sql = "SELECT * FROM users WHERE id=" + req.params.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.json({ status: 200, error: null, response: result});
	});
});

router.get("/users/:username", (req, res) => {
	let sql = `SELECT * FROM users WHERE username='${req.params.username}'`
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.json(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

// delete the record
router.delete("/users/id/:id", (req, res) => {
	let sql = "DELETE FROM users WHERE id=" + req.params.id + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.json(
			JSON.stringify({
				status: 200,
				error: null,
				response: "Usuário deletado com sucesso!",
			})
		);
	});
});

//delete all records
router.delete("/users", (req, res) => {
	let sql = "DELETE FROM users WHERE id > 1";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.json(
			JSON.stringify({
				status: 200,
				error: null,
				response: "Todos os usuários foram deletados com sucesso!",
			})
		);
	});
});

// update the Record
router.put("/users", (req, res) => {

	let password = req.body.password;

	bcrypt.hash(password, saltRounds, (err, hash) => {

		if (err) {
			console.log(err)
		}
		let sql =
			"UPDATE users SET username='" +
			req.body.username +
			"', password='" +
			hash +
			"', cpf='" +
			req.body.cpf +
			"' WHERE id=" +
			req.body.id;
		let query = conn.query(sql, (err, result) => {
			if (err) throw err;
			res.json(
				JSON.stringify({
					status: 200,
					error: null,
					response: "Registro atualizado com sucesso!",
				})
			);
		});
	});
});

//iniciar o servidor
app.listen(process.env.PORT || PORT, () => {
	console.log(`Server running on port ${PORT}`)
} );
console.log('API funcionando!');