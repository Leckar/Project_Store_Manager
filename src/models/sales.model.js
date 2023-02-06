const conn = require('./connection');

const insertNew = async (data) => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (now())',
  );
  await Promise.all(data.map(async ({ productId, quantity }) => {
      await conn.execute(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
        [insertId, productId, quantity],
      );
    }));
  return insertId;
};

module.exports = {
  insertNew,
};