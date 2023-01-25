const pool = require("../config/appconfig");
const bcrypt = require('bcryptjs');

const registrarUsuario = async (usuario) => {
  let { email, password, rol, lenguage } = usuario;
  const passwordEncriptada = bcrypt.hashSync(password)
  const values = [email, passwordEncriptada, rol, lenguage];
  const consulta = "INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4)";
  await pool.query(consulta, values);
};

const verificacionUsuario = async (email, password) => {
  const consulta = "SELECT * FROM usuarios WHERE email = $1"
  const values = [email];
  const { rows: [usuario], rowCount } = await pool.query(consulta, values)
  const { password: passwordEncriptada } = usuario
  const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada)
  if (!passwordEsCorrecta || !rowCount)
  throw { code: 401, message: "Email o contraseña incorrecta" }
};
  const verificacionUsuarioConToken = async (email) => {
    const consulta = "SELECT * FROM usuarios WHERE email = $1";
    const values = [email];
    const {rows} = await pool.query(consulta, values);
    console.log(rows[0])
    return rows[0];
};

module.exports = {
  registrarUsuario,
  verificacionUsuario,
  verificacionUsuarioConToken
};
