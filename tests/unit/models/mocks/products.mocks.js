const productsList = [
    {
      id: 1,
      name: "Martelo de Thor"
    },
    {
      id: 2,
      name: "Traje de encolhimento"
    },
    {
      id: 3,
      name: "Escudo do Capitão América"
    }
];

const productQuery = "Martelo";

const filteredProductList = [
  {
    id: 1,
    name: "Martelo de Thor"
  }
];

const productsIds = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  }
];

const productById = {
    id: 1,
    name: "Martelo de Thor"
  };
  
module.exports = {
  productsList,
  productQuery,
  filteredProductList,
  productsIds,
  productById,
}