const sqlite3 = require('sqlite3').verbose();

exports.getList= (req, res) => {
  const db = openDatabase();

  let datadb = [];
  let sql = `SELECT * FROM Frutas`;

  db.all(sql, [], (err, rows) => {
    if(err){
      throw err
    }
    rows.forEach(row => {
      datadb.push(row);
    });
    res.json({mensaje: 'Lista de productos', data:datadb})
  });

  db.close();
}

exports.getById= (req, res) => {
  const db = openDatabase();
  const sql = `SELECT * FROM Frutas WHERE Id=?`;
  const productId = req.params.id;
  
  db.get(sql, [productId], (err, row) => {
    if(err){
      throw err
    }
    return row
      ? res.json({mensaje: 'Producto encontrado', data:row})
      : res.json({mensaje: 'No hay producto con Id: ' + productId})
  });
  
  db.close();
}

exports.create = (req, res) => {
  const db = openDatabase();

  // Object.values(req.body) convierte Objeto en Array
  // const {Nombre, Color, Precio} = req.body => [Nombre, Color, Precio]
  const values = Object.values(req.body)

  db.run(`INSERT INTO Frutas (Nombre, Color, Precio) VALUES(?, ?, ?)`, values, function(err) {
    if (err) {
      throw err;
    }
    // get the last insert id
    res.json({mensaje: 'Nuevo producto creado', data: req.body, lastItemId:this.lastID})
  });

  db.close();
  
}

exports.update = (req, res) => {
  const db = openDatabase();

  // Object.values(req.body) convierte Objeto en Array
  // const {Nombre, Color, Precio} = req.body => [Nombre, Color, Precio]
  const Id = req.params.id;
  const values = Object.values(req.body)

 db.run(`UPDATE Frutas SET Nombre=?, Color=?, Precio=? WHERE Id=?`, [...values, Id], function(err) {
    if (err) {
      throw err;
    }
    // get the last insert id
    res.json({mensaje: 'Producto actualizado', data: req.body, itemsUpdated:this.changes})
  });

  db.close();
  
}

exports.delete = (req, res) => {
  const db = openDatabase();

  // Object.values(req.body) convierte Objeto en Array
  // const {Nombre, Color, Precio} = req.body => [Nombre, Color, Precio]
  const Id = req.params.id;

 db.run(`DELETE FROM Frutas WHERE Id=?`, Id, function(err) {
    if (err) {
      throw err;
    }
    // get the last insert id
    res.json({mensaje: 'Producto eliminado', itemsDeleted:this.changes})
  });

  db.close();
  
}


// Funcion para conectarse a la BD
const openDatabase = () => {
    // open the database
  let db = new sqlite3.Database('./server/db/store.db', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Connected to database.');
    }
  });
  return db
}