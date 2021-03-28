exports.home = (req, res) => {
  res.json({
    mensaje: 'Bienvenido a casa'
  })
}

exports.login = (req, res) => {
  res.json({mensaje: 'Pagina de login'})
}