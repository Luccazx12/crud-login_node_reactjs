const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const cors = require("cors");


router.get("/", async (req, res) => {
  const listadeusuarios = await Users.findAll();
  res.json(listadeusuarios);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const users = await Users.findAll({ where: { id: id } });
  res.json(users);
});

router.post("/", async (req, res) => {
  const { username, password, cpf, departament, gerencia, image_user} = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      cpf: cpf,
      departament: departament,
      gerencia: gerencia,
      image_user: image_user
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    res.json("YOU LOGGED IN!!!");
  });
});

module.exports = router;