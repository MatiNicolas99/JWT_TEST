const { registrarUsuario, verificacionUsuario, verificacionUsuarioConToken } = require("../models/appmodel")
const jwt = require("jsonwebtoken");



const nuevoUsuario = async (req, res) => {
  try {
  const usuario = req.body
  await registrarUsuario(usuario)
  res.send("Usuario creado con éxito")
  } catch (error) {
  res.status(500).send(error)
  }
  }

const loginUsuario = async (req, res) => {
  try {
  const { email, password } = req.body
  await verificacionUsuario(email, password)
  const token = jwt.sign({ email }, "az_AZ")
  res.send(token)
  } catch (error) {
  console.log(error)
  res.status(error.code || 500).send(error)
  };
};

const mostrarUsuario = async (req, res) => {
  try {
  const Authorization = req.header("Authorization")
  const token = Authorization.split("Bearer ")[1]
  jwt.verify(token, "az_AZ")
  const { email } = jwt.decode(token)
  const data = await verificacionUsuarioConToken(email)
  res.send(data)
  } catch (error) {
  res.status(error.code || 500).send(error)
  }
};

module.exports = {nuevoUsuario, loginUsuario, mostrarUsuario}

