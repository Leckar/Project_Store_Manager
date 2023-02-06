const { expect } = require('chai');
const sinon = require('sinon');
const { productsModels } = require('../../../src/models');
const conn = require('../../../src/models/connection');

const { productsList, productQuery,
  filteredProductList, productsIds,
  productById } = require('./mocks');

describe('The model layer should be able to communicate successfully with the databaase', function () {
  describe('The listAll model should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should return all products in an object array with id and product name', async function () {
      sinon.stub(conn, 'execute').resolves([productsList]);
      
      const result = await productsModels.listAll();

      expect(result).to.be.deep.equal(productsList);
    });
  });
  describe('The listByQuery model should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should return all products in an filtered object array with id and product name', async function () {
      sinon.stub(conn, 'execute').resolves([filteredProductList]);

      const result = await productsModels.listByQuery(productQuery);

      expect(result).to.be.deep.equal(filteredProductList);
    });
  });
  describe('The listAllById model should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should return all ids in an filtered array', async function () {
      sinon.stub(conn, 'execute').resolves([productsIds]);

      const result = await productsModels.listAllById();

      expect(result).to.be.deep.equal(productsIds);
    });
  });
  describe('The listById model should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should return the product which id has been given', async function () {
      sinon.stub(conn, 'execute').resolves([[productById]]);

      const result = await productsModels.listById(1);

      expect(result).to.be.equal(productById);
    });
    it('should return undefined if an invalid id is given', async function () {
      sinon.stub(conn, 'execute').resolves([[undefined]]);

      const result = await productsModels.listById(999);

      expect(result).to.be.equal(undefined);
    });
  });
  describe('The insertNew model should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should return the insertID after posting a new product', async function () {
      sinon.stub(conn, 'execute')
        .onFirstCall().resolves([{ insertId: 69 }])
        .onSecondCall().resolves([[{id: 4, name: "Asas de borboleta" }]]);

      const result = await productsModels.insertNew("Asas de borboleta");
      const newProd = await productsModels.listById(4);

      expect(result).to.be.equal(69);
      expect(newProd).to.be.deep.equal({ id: 4, name: "Asas de borboleta" });
    });
  });
  describe('The updateById model should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should NOT throw an error after successfully updating a product', async function () {
      sinon.stub(conn, 'execute').resolves();

      const result = await productsModels.updateById(1, "Asas de borboleta");

      expect(result).to.equal(undefined);
    });
  });
  describe('The deleteById model should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should successfully delete a product given a correct id', async function () {
      sinon.stub(conn, 'execute').resolves()
  

      const result = await productsModels.deleteById(1);

      expect(result).to.equal(undefined);
    });
  });
});