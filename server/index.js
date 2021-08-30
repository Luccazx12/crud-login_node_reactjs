const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session");

const port = 3002;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const multer = require('multer');

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

// Validador de CPF
// const { cpf } = require('cpf-cnpj-validator');
// const { validator } = require('cpf-cnpj-validator');
// const Joi = require('@hapi/joi').extend(validator)


// //CPF VALIDATOR ---------------------
// // gera um número de cpf
// const num = cpf.generate();
// // #=> 25634428777

// // verifica se é um número válido
// cpf.isValid(num);
// // #=> true

// // formata o número gerado
// cpf.format(num);
// // #=> 256.344.287-77

// const cnpjSchema = Joi.document().cnpj();
// const cpfSchema = Joi.document().cpf();

// // valida o CPF
// cpfSchema.validate('54271113107');
// // #=> true

// // valida o CNPJ
// cnpjSchema.validate('38313108000107');
// // #=> true



//UPLOAD DE IMAGENS
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		//cb(null, './uploads/');
		cb(null, 'uploads/');
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
		fileSize: 1024 * 1024 * 5
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

//iniciar o servidor
app.listen(port);
console.log('API funcionando!');

const conn = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	database: "crud777",
});

// connect to database
conn.connect((err) => {
	if (err) throw err;
	console.log("MySQL connected");
});

//Rotas Login
app.get("/login", (req, res) => {
	if (req.session.user) {
	  res.send({ loggedIn: true, user: req.session.user });
	} else {
	  res.send({ loggedIn: false });
	}
  });
  
  app.post("/login", (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
  
	conn.query(
	  "SELECT * FROM users WHERE username = ?;",
	  username,
	  (err, result) => {
		if (err) {
		  res.send({ err: err });
		}
  
		if (result.length > 0) {
		  bcrypt.compare(password, result[0].password, (error, response) => {
			if (response) {
			  req.session.user = result;
			  console.log(req.session.user);
			  res.send(result);
			} else {
			  res.send({ message: "Wrong username/password combination!" });
			}
		  });
		} else {
		  res.send({ message: "User doesn't exist" });
		}
	  }
	);
  });
  



//Rotas REGISTRO (Gerencia)

//insert a record
router.post("/users", upload.single('imagem_cliente'), (req, res, next) => {
	let id = req.body.id;
	let username = req.body.username;
	let password = req.body.password;
	let cpf = req.body.cpf;
	let select = req.body.select;
	const imagem = req.file.path;

	bcrypt.hash(password, saltRounds, (err, hash) => {

		if (err) {
			console.log(err)
		}
		const sqlInsert =
			"INSERT INTO users (id, username, password, cpf , departament, image_user) VALUES (?, ?, ?, ?, ?, ?)";
		conn.query(sqlInsert, [id, username, hash, cpf, select, imagem], (err, result) => {
			if (err) console.log(err)

			//   res.send(
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
router.get("/users", (req, res) => {
	let sql = "SELECT * FROM users;";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

// show a single record
router.get("/users/id/:id", (req, res) => {
	let sql = "SELECT * FROM users WHERE id=" + req.params.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});
router.get("/users/username", (req, res) => {
	let sql = `SELECT * FROM users WHERE username='${req.params.username}'`
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

// delete the record
router.delete("/users/id/:id", (req, res) => {
	let sql = "DELETE FROM users WHERE id=" + req.params.id + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(
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
	let sql = "TRUNCATE TABLE users";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(
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
	let sql =
		"UPDATE users SET username='" +
		req.body.username +
		"', password='" +
		req.body.password +
		"', cpf='" +
		req.body.cpf +
		"', departament='" +
		req.body.select +
		"' WHERE id=" +
		req.body.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(
			JSON.stringify({
				status: 200,
				error: null,
				response: "Registro atualizado com sucesso!",
			})
		);
	});
});