const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const bodyParser = require('body-parser');
const port = 3002; //porta padrão
const mysql = require('mysql');
const multer = require('multer');

// Validador de CPF
// const { cpf } = require('cpf-cnpj-validator');
// const { validator } = require('cpf-cnpj-validator');
// const Joi = require('@hapi/joi').extend(validator)

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		//cb(null, './uploads/');
		cb(null, 'uploads/');
	},
	filename: function(req, file, cb) {
	   cb(null, Date.now() + file.originalname);  
	}
  });
  
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||  file.mimetype === 'image/jpg'){
	  cb(null, true);
  } else {
    cb(null, false);
  }
}

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
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
    fileFilter: fileFilter
});

// configurando body parse para pegar os POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// definindo as rotas
const router = express.Router();
router.get('/',(req, res) => res.json({ message: 'funcionando'}));
app.use('/', router);
app.use('/uploads', express.static('uploads'));

//iniciar o servidor
app.listen(port);
console.log('API funcionando!');

const conn = mysql.createConnection({
	host: "localhost",
	port: 3307,
	user: "root",
	database: "crud777",
  });
  
  // connect to database
  conn.connect((err) => {
	if (err) throw err;
	console.log("MySQL connected");
  });
  
  //Rotas MYSQL

  //insert a record
  router.post("/clientes", upload.single('imagem_cliente'), (req, res, next) => {
	let id = req.body.id;
	let nome = req.body.nome;
	let cpf = req.body.cpf;
    const imagem = req.file.path; 

	const sqlInsert =
	  "INSERT INTO clientes (id, nome, cpf, imagem_cliente) VALUES (?, ?, ?, ?)";
	conn.query(sqlInsert, [id, nome, cpf, imagem], (err, result) => {
	  if (err) console.log(err)

	//   res.send(
	// 	JSON.stringify({
	// 	  status: 200,
	// 	  error: null,
	// 	  response: "New Record is Added successfully",
	// 	})
	//   );
	  console.log(result);
	});
	let query2 = conn.query("SET @count = 0;");
	let query3 = conn.query(
	  "UPDATE clientes SET clientes.id = @count:= @count+1;"
	);
  });
  
  // show all records
  router.get("/clientes", (req, res) => {
	let sql = "SELECT * FROM clientes;";
	let query = conn.query(sql, (err, result) => {
	  if (err) throw err;
	  res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
	let query2 = conn.query("SET @count = 0;");
	let query3 = conn.query(
	  "UPDATE clientes SET clientes.id = @count:= @count+1;"
	);
  });
  
  // show a single record
  router.get("/clientes/:id", (req, res) => {
	let sql = "SELECT * FROM clientes WHERE id=" + req.params.id;
	let query = conn.query(sql, (err, result) => {
	  if (err) throw err;
	  res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
  });
  
  // delete the record
  router.delete("/clientes/:id", (req, res) => {
	let sql = "DELETE FROM clientes WHERE id=" + req.params.id + "";
	let query = conn.query(sql, (err, result) => {
	  if (err) throw err;
	  res.send(
		JSON.stringify({
		  status: 200,
		  error: null,
		  response: "Registro deletado com sucesso!",
		})
	  );
	});
	let query2 = conn.query("SET @count = 0;");
	let query3 = conn.query(
	  "UPDATE clientes SET clientes.id = @count:= @count+1;"
	);
  });

//delete all records
  router.delete("/clientes", (req, res) => {
	let sql = "TRUNCATE TABLE clientes";
	let query = conn.query(sql, (err, result) => {
	  if (err) throw err;
	  res.send(
		JSON.stringify({
		  status: 200,
		  error: null,
		  response: "Todos os registros foram deletados com sucesso!",
		})
	  );
	});
	let query2 = conn.query("SET @count = 0;");
	let query3 = conn.query(
	  "UPDATE clientes SET clientes.id = @count:= @count+1;"
	);
  });
  
  // update the Record
  router.put("/clientes", (req, res) => {
	let sql =
	  "UPDATE clientes SET nome='" +
	  req.body.nome +
	  "', cpf='" +
	  req.body.cpf +
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
  