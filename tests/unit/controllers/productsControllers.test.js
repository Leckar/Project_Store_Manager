const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsControllers } = require('../../../src/controllers');
const { productsServices } = require('../../../src/services');
const { httpStatuses } = require('../../../src/utils/httpStatuses');

const { productsList } = require('../mocks');
const { NOT_FOUND_STATUS, UNPROCESSABLE_ENTITY } = httpStatuses;
const PRODUCT_NOT_FOUND = 'Product not found';
const { expect } = chai;

chai.use(sinonChai);

describe('The service layer should be able to manage all data successfully', function () {
  describe('The listProducts service should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should return all products in an object array with id and product name', async function () {
      const req = {};
      const res = {};
      sinon.stub(productsServices, 'listAll').resolves({ type: null, message: productsList });
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await productsControllers.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsList);
    });
    it('should return an error if the database returns undefined', async function () {
      const req = {};
      const res = {};
      sinon.stub(productsServices, 'listAll').resolves({ type: NOT_FOUND_STATUS, message: PRODUCT_NOT_FOUND });
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await productsControllers.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(NOT_FOUND_STATUS);
      expect(res.json).to.have.been.calledWith(PRODUCT_NOT_FOUND);
    });
  });
  describe('The searchProducts service should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should return all products in an object array with id and product name', async function () {
      const req = { query: { q: 'Mar' } };
      const res = {};
      sinon.stub(productsServices, 'listByName').resolves({
        type: null, message: [{
          id: 1,
          name: "Martelo de Thor"
        }]
      });
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      await productsControllers.searchProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([{ id: 1, name: 'Martelo de Thor' }]);
    });
  });
});