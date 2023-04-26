import { CartDAO } from "../Dao/carts/cartDao.js";
const cartDAO = new CartDAO();

export const cartRepository = {
  createCart: async () => {
    try {
      const newCart = await cartDAO.createCart();
      return newCart;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getCartById: async (cartId) => {
    try {
      const cart = await cartDAO.getCartById(cartId);
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  addProductToCart: async (cartId, productId) => {
    try {
      const cart = await cartDAO.addProductToCart(cartId, productId);
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deleteProductFromCart: async (cartId, productId) => {
    try {
      const cart = await cartDAO.deleteProductFromCart(cartId, productId);
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  updateCart: async (cartId, updateData) => {
    console.log("update", updateData)
    
    try {
      const cart = await cartDAO.updateCart(cartId, updateData);
      console.log("carRepository", cart)
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  updateProductQuantityInCart: async (cartId, productId, quantity) => {
    try {
      const cart = await cartDAO.updateProductQuantityInCart(
        cartId,
        productId,
        quantity
      );
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  deleteAllProductsFromCart: async (cartId) => {
    try {
      const cart = await cartDAO.deleteAllProductsFromCart(cartId);
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getCartByIdproduct: async (cartId) => {
    try {
      const cart = await cartDAO.getCartByIdproduct(cartId);
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
