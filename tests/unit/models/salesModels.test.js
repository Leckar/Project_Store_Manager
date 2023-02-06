const { expect } = require('chai');
const sinon = require('sinon');
const { salesModels } = require('../../../src/models');
const conn = require('../../../src/models/connection');

const { salesList } = require('./mocks');

describe('The model layer should be able to communicate successfully with the database', function () {
  describe('The listAll model should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should return all sales and sales products in an object array with id and product name', async function () {
      sinon.stub(conn, 'execute')
        .onFirstCall().resolves([salesList.sales])
        .onSecondCall().resolves([salesList.products]);

      const result = await salesModels.listAll();

      expect(result).to.be.deep.equal(salesList);
    });
  });
  describe('The listByQuery model should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should return the correct sale given a correct id', async function () {
      sinon.stub(conn, 'execute').resolves([[salesList.sales[0]]]);

      const result = await salesModels.listById(1);

      expect(result).to.be.deep.equal(salesList.sales[0]);
    });
  });
  describe('The listProductSaleById model should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should return all sale products given a correct id', async function () {
      sinon.stub(conn, 'execute').resolves([salesList.products[0], salesList.products[1]]);

      const result = await salesModels.listProductSaleById(1);

      expect(result).to.be.deep.equal(salesList.products[0], salesList.products[1]);
    });
  });
  describe('The insertNew model should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should insert a new sale and new sale products given a valid id', async function () {
      sinon.stub(conn, 'execute')
        .onFirstCall().resolves([{ insertId: 69 }])
        .onSecondCall().resolves();

      const result = await salesModels.insertNew([{ product_id: 2, quantity: 2 }]);

      expect(result).to.be.equal(69);
    });
  });
  describe('The deleteSale model should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should successfully delete sale and the sale products', async function () {
      sinon.stub(conn, 'execute')
        .onFirstCall().resolves()
        .onSecondCall().resolves();

      const result = await salesModels.deleteSale(69);

      expect(result).to.be.equal(undefined);
    });
  });
  // describe('The updateById model should resolve coherent requests', function () {
  //   afterEach(sinon.restore);
  //   it('should NOT throw an error after successfully updating a product', async function () {
  //     sinon.stub(conn, 'execute').resolves();

  //     const result = await productsModels.updateById(1, "Asas de borboleta");

  //     expect(result).to.equal(undefined);
  //   });
  // });
  // describe('The deleteById model should resolve coherent requests', function () {
  //   afterEach(sinon.restore);
  //   it('should successfully delete a product given a correct id', async function () {
  //     sinon.stub(conn, 'execute').resolves()


  //     const result = await productsModels.deleteById(1);

  //     expect(result).to.equal(undefined);
  //   });
  // });
});