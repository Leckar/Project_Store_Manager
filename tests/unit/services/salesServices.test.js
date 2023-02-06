const { expect } = require('chai');
const sinon = require('sinon');
const { productsModels, salesModels } = require('../../../src/models');
const { salesServices } = require('../../../src/services');
const conn = require('../../../src/models/connection');
const { httpStatuses } = require('../../../src/utils/httpStatuses');

const { salesList, productsList } = require('../mocks');

const { NOT_FOUND_STATUS, BAD_REQUEST_STATUS, UNPROCESSABLE_ENTITY } = httpStatuses;
const PRODUCT_NOT_FOUND = 'Product not found';
const QUANTITY_TOO_LOW = '"quantity" must be greater than or equal to 1';
const SALE_NOT_FOUND = 'Sale not found'

describe('The service layer should be able to manage all data successfully', function () {
  describe('The insertSale service should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should return an error if the id doesnt match any sale product', async function () {
      sinon.stub(productsModels, 'listAll').resolves([productsList]);

      const result = await salesServices.insertSale([{ productId: 5, quantity: 5 },
        { productId: 6, quantity: 10 },]);

      expect(result).to.be.deep.equal({ type: NOT_FOUND_STATUS, message: PRODUCT_NOT_FOUND });
    });
    it('should return an error if the quantity is invalid', async function () {
      sinon.stub(productsModels, 'listAll').resolves([productsList]);

      const result = await salesServices.insertSale([{ productId: 5, quantity: 0 },
      { productId: 6, quantity: 10 },]);

      expect(result).to.be.deep.equal({ type: UNPROCESSABLE_ENTITY, message: QUANTITY_TOO_LOW });
    });
    it('should return the new registered sale if no errors occur', async function () {
      sinon.stub(productsModels, 'listAllById').resolves([{ id: 1 }, { id: 2 }]);
      sinon.stub(salesModels, 'insertNew').resolves(3);

      const result = await salesServices.insertSale([{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }]);

      expect(result).to.be.deep.equal({
        type: null, message: {
          id: 3,
          itemsSold: [{ productId: 1, quantity: 1 },
          { productId: 2, quantity: 5 }],
        } });
    });
  });
  describe('The listAll service should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should return an error if the id doesnt match any sale product', async function () {
      sinon.stub(salesModels, 'listAll').resolves(salesList);

      const result = await salesServices.listAll();

      expect(result).to.be.deep.equal({
        type: null,
        message: [
          {
            saleId: 1,
            date: '2023 - 02 - 06T19: 12: 38.000Z',
            productId: 1,
            quantity: 5
          },
          {
            saleId: 1,
            date: '2023 - 02 - 06T19: 12: 38.000Z',
            productId: 2,
            quantity: 10
          },
          {
            saleId: 2,
            date: '2023 - 02 - 06T19: 12: 38.000Z',
            productId: 3,
            quantity: 15
          }
        ]
      })
    });
  });
  describe('The deleteSale service should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should return an error if the id doesnt match any sale product', async function () {
      sinon.stub(salesModels, 'listById').resolves(undefined);

      const result = await salesServices.deleteSale(999);

      expect(result).to.be.deep.equal({ type: NOT_FOUND_STATUS, message: SALE_NOT_FOUND })
    });
    it('should resolve as expected if no error arises', async function () {
      sinon.stub(salesModels, 'listById').resolves(salesList.sales[0]);

      const result = await salesServices.deleteSale(1);

      expect(result).to.be.deep.equal({ type: null, message: '' })
    });
  });
  describe('The updateSale service should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should return the newly updated sale if no errors occur', async function () {
      sinon.stub(productsModels, 'listAllById').resolves([{ id: 1 }, { id: 2 }]);
      sinon.stub(salesModels, 'listById').resolves(salesList.sales[0]);
      sinon.stub(salesModels, 'updateById').resolves();


      const result = await salesServices.updateSale(1, [{ productId: 1, quantity: 7 }, { productId: 2, quantity: 7 }]);
      
      expect(result).to.be.deep.equal({ type: null, message: { saleId: 1, itemsUpdated: [{ productId: 1, quantity: 7 }, { productId: 2, quantity: 7 }] } })
    });
    it('should return an error if the quantity is 0 or less', async function () {
      sinon.stub(productsModels, 'listAllById').resolves([{ id: 1 }, { id: 2 }]);
      sinon.stub(salesModels, 'listById').resolves(salesList.sales[0]);
      sinon.stub(salesModels, 'updateById').resolves();


      const result = await salesServices.updateSale(1, [{ productId: 1, quantity: 0 }, { productId: 2, quantity: 7 }]);

      expect(result).to.be.deep.equal({ type: UNPROCESSABLE_ENTITY, message: QUANTITY_TOO_LOW })
    });
    it('should return an error if any product id doesnt match', async function () {
      sinon.stub(productsModels, 'listAllById').resolves([{ id: 1 }, { id: 2 }]);
      sinon.stub(salesModels, 'listById').resolves(salesList.sales[0]);
      sinon.stub(salesModels, 'updateById').resolves();


      const result = await salesServices.updateSale(1, [{ productId: 9, quantity: 2 }, { productId: 1, quantity: 7 }]);

      expect(result).to.be.deep.equal({ type: NOT_FOUND_STATUS, message: PRODUCT_NOT_FOUND })
    });
    it('should return an error if the sale id doesnt match', async function () {
      sinon.stub(productsModels, 'listAllById').resolves([{ id: 1 }, { id: 2 }]);
      sinon.stub(salesModels, 'listById').resolves(undefined);
      sinon.stub(salesModels, 'updateById').resolves();


      const result = await salesServices.updateSale(999, [{ productId: 1, quantity: 2 }, { productId: 2, quantity: 7 }]);

      expect(result).to.be.deep.equal({ type: NOT_FOUND_STATUS, message: SALE_NOT_FOUND })
    });
  });
  describe('The listSaleById service should resolve coherent requests', function () {
    afterEach(sinon.restore);
    it('should return an error if the sale id doestn match', async function () {
      sinon.stub(salesModels, 'listById').resolves(undefined);

      const result = await salesServices.listSaleById(999);

      expect(result).to.be.deep.equal({ type: NOT_FOUND_STATUS, message: SALE_NOT_FOUND })
    });
    it('should return an error if the sale id doestn match', async function () {
      sinon.stub(salesModels, 'listById').resolves(salesList.sales[0]);
      sinon.stub(salesModels, 'listProductSaleById').resolves([salesList.products[0], salesList.products[1]]);

      const result = await salesServices.listSaleById(1);

      expect(result).to.be.deep.equal({
        type: null, message: [{
          date: "2023 - 02 - 06T19: 12: 38.000Z",
          productId: 1,
          quantity: 5,
        }, {
          date: "2023 - 02 - 06T19: 12: 38.000Z",
          productId: 2,
          quantity: 10,
        }]
      })
    });
  });
});