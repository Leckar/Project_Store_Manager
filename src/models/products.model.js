const conn = require('./connection');

const listAll = async () => {
  const [result] = await conn.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC',
  );
  return result;
};

const listAllById = async () => {
  const [result] = await conn.execute(
    'SELECT id FROM StoreManager.products ORDER BY id ASC',
  );
  return result;
};

const listById = async (id) => {
  const [[result]] = await conn.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return result;
};
 
const insertNew = async (name) => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  return insertId;
};

const updateById = async (id, name) => {
  const [result] = await conn.execute(
    'UPDATE StoreManager.products SET name = (?) WHERE id = ?',
    [name, id],
  );
  return result;
};

module.exports = {
  listAll,
  listAllById,
  listById,
  insertNew,
  updateById,
};