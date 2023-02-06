const conn = require('./connection');

const listAll = async () => {
  const [result] = await conn.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC',
  );
  return result;
};

const listByQuery = async (query) => {
  const [result] = await conn.execute(
    'SELECT * FROM StoreManager.products WHERE name LIKE ?',
    [`${query}%`],
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
  await conn.execute( // não lembrava como fazer essa query e encontrei em https://intellipaat.com/blog/tutorial/sql-tutorial/update-query/#:~:text=The%20UPDATE%20command%20in%20SQL,the%20rows%20will%20be%20affected.
    'UPDATE StoreManager.products SET name = (?) WHERE id = ?',
    [name, id],
  );
};

const deleteById = async (id) => {
  await conn.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
};

module.exports = {
  listAll,
  listByQuery,
  listAllById,
  listById,
  insertNew,
  updateById,
  deleteById,
};