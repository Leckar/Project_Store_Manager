const conn = require('./connection');

const listAll = async () => {
  const [result] = await conn.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC',
  );
  return result;
};
 
module.exports = {
  listAll,
};