const { expect } = require('chai');
const sinon = require('sinon');
const { productsModels } = require('../../../src/models');
const { productsServices } = require('../../../src/services');
const { httpStatuses } = require('../../../src/utils/httpStatuses');

const { NOT_FOUND_STATUS, BAD_REQUEST_STATUS, UNPROCESSABLE_ENTITY } = httpStatuses;
const PRODUCT_NOT_FOUND = 'Product not found';
const NAME_TOO_SHORT = '"name" length must be at least 5 characters long';

const { productsList } = require('../mocks');

describe('The service layer should be able to manage all data successfully', function () {
  describe('The listAll service should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should return all products in an object array with id and product name', async function () {
      sinon.stub(productsModels, 'listAll').resolves(productsList);

      const result = await productsServices.listAll();

      expect(result).to.be.deep.equal({ type: null, message: productsList });
    });
    it('should return an error if the database returns undefined', async function () {
      sinon.stub(productsModels, 'listAll').resolves(undefined);

      const result = await productsServices.listAll();

      expect(result).to.be.deep.equal({ type: NOT_FOUND_STATUS, message: PRODUCT_NOT_FOUND });
    });
  });
  describe('The listByName service should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should return all products in an object array with id and product name', async function () {
      sinon.stub(productsModels, 'listByQuery').resolves(productsList[0]);

      const result = await productsServices.listByName("Martelo");

      expect(result).to.be.deep.equal({ type: null, message: productsList[0] });
    });
    it('should return an error if the database returns undefined', async function () {
      sinon.stub(productsModels, 'listByQuery').resolves(undefined);

      const result = await productsServices.listByName("Xablau");

      expect(result).to.be.deep.equal({ type: NOT_FOUND_STATUS, message: PRODUCT_NOT_FOUND });
    });
  });
  describe('The listById service should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should return all products in an object array with id and product name', async function () {
      sinon.stub(productsModels, 'listById').resolves(productsList[0]);

      const result = await productsServices.listById(1);

      expect(result).to.be.deep.equal({ type: null, message: productsList[0] });
    });
    it('should return an error if the database returns undefined', async function () {
      sinon.stub(productsModels, 'listById').resolves(undefined);

      const result = await productsServices.listById(999);

      expect(result).to.be.deep.equal({ type: NOT_FOUND_STATUS, message: PRODUCT_NOT_FOUND });
    });
    it('should return an error if the id is invalid, 0 or less', async function () {
      sinon.stub(productsModels, 'listById').resolves();

      const result = await productsServices.listById(0);

      expect(result).to.be.deep.equal({ type: NOT_FOUND_STATUS, message: PRODUCT_NOT_FOUND });
    });
    it('should return an error if the id is invalid, not an integer', async function () {
      sinon.stub(productsModels, 'listById').resolves();

      const result = await productsServices.listById(1.82312);

      expect(result).to.be.deep.equal({ type: NOT_FOUND_STATUS, message: PRODUCT_NOT_FOUND });
    });
  });
  describe('The insertProduct service should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should return the new product in an object with id and product name', async function () {
      sinon.stub(productsModels, 'insertNew').resolves(4)
      sinon.stub(productsModels, 'listById').resolves({ id: 4, name: "Asas de borboleta" });

      const result = await productsServices.insertProduct("Asas de borboleta");

      expect(result).to.be.deep.equal({ type: null, message: { id: 4, name: "Asas de borboleta" } });
    });
    it('should return an error in case of name shorter than 5 characters', async function () {
      sinon.stub(productsModels, 'insertNew').resolves()
      sinon.stub(productsModels, 'listById').resolves();

      const result = await productsServices.insertProduct('Oi');

      expect(result).to.be.deep.equal({ type: UNPROCESSABLE_ENTITY, message: NAME_TOO_SHORT });
    });
  });
  describe('The updateProduct service should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should return an error if the id doesnt match any products', async function () {
      sinon.stub(productsModels, 'updateById').resolves()
      sinon.stub(productsModels, 'listById')
        .onFirstCall().resolves(undefined);

      const result = await productsServices.updateProduct(999, "Asas de borboleta");

      expect(result).to.be.deep.equal({ type: NOT_FOUND_STATUS, message: PRODUCT_NOT_FOUND });
    });
    it('should return a newly edited product', async function () {
      sinon.stub(productsModels, 'updateById').resolves()
      sinon.stub(productsModels, 'listById')
        .onFirstCall().resolves({ id: 1, name: "Martelo de Thor" })
        .onSecondCall().resolves({ id: 1, name: "Martelo do Papaléguas" });

      const result = await productsServices.updateProduct(1, 'Martelo do Papaléguas');

      expect(result).to.be.deep.equal({ type: null, message: { id: 1, name: "Martelo do Papaléguas" } });
    });
    it('should return an error if the name is invalid', async function () {
      const result = await productsServices.updateProduct(999, "As");

      expect(result).to.be.deep.equal({ type: UNPROCESSABLE_ENTITY, message: NAME_TOO_SHORT });
    });
  });
  describe('The removeProduct service should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should return an error if the id doesnt match any products', async function () {
      sinon.stub(productsModels, 'deleteById').resolves()
      sinon.stub(productsModels, 'listById')
        .onFirstCall().resolves(undefined);

      const result = await productsServices.removeProduct(999);

      expect(result).to.be.deep.equal({ type: NOT_FOUND_STATUS, message: PRODUCT_NOT_FOUND });
    });
    it('should work as intended if no errors occur', async function () {
      sinon.stub(productsModels, 'deleteById').resolves()
      sinon.stub(productsModels, 'listById').resolves({ id: 1, name: "Martelo de Thor" });

      const result = await productsServices.removeProduct(1);

      expect(result).to.be.deep.equal({ type: null, message: '' });
    });
  });
});