const conn = require('./connection');

const listAll = async () => {
  const [sales] = await conn.execute(
    'SELECT * FROM StoreManager.sales',
  );
  const [products] = await conn.execute(
    'SELECT * FROM StoreManager.sales_products',
  );
  return { sales, products };
};

const listById = async (id) => {
  const [[sale]] = await conn.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return sale;
};
const listProductSaleById = async (id) => {
  const [products] = await conn.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
  return products;
};

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

const deleteSale = async (id) => {
  Promise.all(await conn.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  ), await conn.execute(
    'DELETE FROM sales_products WHERE sale_id = ?',
    [id],
  ));
};

module.exports = {
  insertNew,
  listAll,
  listById,
  listProductSaleById,
  deleteSale,
};