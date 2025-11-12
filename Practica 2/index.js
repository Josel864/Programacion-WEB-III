const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',          
  password: '',          
  database: 'tienda'     
});

async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

// 1
app.post('/categorias', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio' });
    const result = await query('INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);
    const nueva = await query('SELECT * FROM categorias WHERE id = ?', [result.insertId]);
    res.status(201).json(nueva[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2
app.get('/categorias', async (req, res) => {
  try {
    const categorias = await query('SELECT * FROM categorias');
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3
app.get('/categorias/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [categoria] = await query('SELECT * FROM categorias WHERE id = ?', [id]);
    if (!categoria) return res.status(404).json({ error: 'Categoría no encontrada' });
    const productos = await query('SELECT * FROM productos WHERE categoria_id = ?', [id]);
    res.json({ categoria, productos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4
app.put('/categorias/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const result = await query('UPDATE categorias SET nombre=?, descripcion=? WHERE id=?', [nombre, descripcion, id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
    const actualizada = await query('SELECT * FROM categorias WHERE id = ?', [id]);
    res.json(actualizada[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5
app.delete('/categorias/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM categorias WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json({ mensaje: 'Categoría eliminada y productos asociados borrados automáticamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6
app.post('/productos', async (req, res) => {
  try {
    const { nombre, precio, stock, categoria_id } = req.body;
    const cat = await query('SELECT id FROM categorias WHERE id = ?', [categoria_id]);
    if (cat.length === 0) return res.status(400).json({ error: 'Categoría inexistente' });
    const result = await query('INSERT INTO productos (nombre, precio, stock, categoria_id) VALUES (?, ?, ?, ?)',
      [nombre, precio, stock, categoria_id]);
    const nuevo = await query('SELECT * FROM productos WHERE id = ?', [result.insertId]);
    res.status(201).json(nuevo[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7
app.get('/productos', async (req, res) => {
  try {
    const productos = await query(`
      SELECT p.*, c.nombre AS categoria_nombre
      FROM productos p
      JOIN categorias c ON p.categoria_id = c.id
    `);
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8
app.get('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [producto] = await query(`
      SELECT p.*, c.nombre AS categoria_nombre
      FROM productos p
      JOIN categorias c ON p.categoria_id = c.id
      WHERE p.id = ?
    `, [id]);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 9
app.put('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, stock, categoria_id } = req.body;
    const result = await query('UPDATE productos SET nombre=?, precio=?, stock=?, categoria_id=? WHERE id=?',
      [nombre, precio, stock, categoria_id, id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    const actualizado = await query('SELECT * FROM productos WHERE id = ?', [id]);
    res.json(actualizado[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 10
app.patch('/productos/:id/stock', async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad } = req.body;
    const [producto] = await query('SELECT stock FROM productos WHERE id = ?', [id]);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    const nuevoStock = producto.stock + Number(cantidad);
    if (nuevoStock < 0) return res.status(400).json({ error: 'El stock no puede ser negativo' });
    await query('UPDATE productos SET stock=? WHERE id=?', [nuevoStock, id]);
    const [actualizado] = await query('SELECT * FROM productos WHERE id = ?', [id]);
    res.json({ mensaje: 'Stock actualizado', producto: actualizado });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
