const conn = require('./connection');

const listAll = async () => {
  const [result] = await conn.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC',
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
 
module.exports = {
  listAll,
  listById,
};