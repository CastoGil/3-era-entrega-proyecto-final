import { productDAO } from "../Dao/products/productDao.js";

const productRepository = {
  getAllProducts: async (query, sort, page, limit) => {
    return await productDAO.getAllProducts(query, sort, page, limit);
  },
  getProductById: async (id) => {
    return await productDAO.getProductById(id);
  },
  createProduct: async (product) => {
    return await productDAO.createProduct(product);
  },
  updateProduct: async (id, product) => {
    return await productDAO.updateProduct(id, product, {
      new: true,
      runValidators: true,
    });
  },
  deleteProduct: async (id) => {
    return await productDAO.deleteProduct(id);
  },
};

export default productRepository;
