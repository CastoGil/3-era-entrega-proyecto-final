import { cartService } from "../../services/cartService.js";
import { CartDTO } from "../../Dto/cartDto.js";
export const cartController = {
  createCart: async (req, res, next) => {
    try {
      const newCart = await cartService.createCart();
      console.log(newCart);
      const cartDTO = new CartDTO(newCart.id, []);
      res.status(201).json(cartDTO);
    } catch (error) {
      next(error);
    }
  },
  getCartById: async (req, res, next) => {
    try {
      const cartId = req.params.cid;
      const cart = await cartService.getCartById(cartId);
      console.log(cart._id);
      const products = cart.products.map((product) => {
        const { _id, title, description, price, thumbnail, code, stock } =
          product._id;
        return {
          _id,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
          quantity: product.quantity,
        };
      });
      const cartDTO = new CartDTO(cart._id, products);
      res.status(200).json(cartDTO);
    } catch (error) {
      next(error);
    }
  },
  addProductToCart: async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      const cart = await cartService.addProductToCart(cid, pid);
      const products = cart.products.map((product) => ({
        id: product._id,
        quantity: product.quantity,
      }));
      const cartDTO = new CartDTO(cart.id, products);
      res.status(200).json(cartDTO);
    } catch (error) {
      next(error);
    }
  },
  deleteProductFromCart: async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      const cart = await cartService.deleteProductFromCart(cid, pid);
      const products = cart.products.map((product) => ({
        id: product._id,
        quantity: product.quantity,
      }));
      const cartDTO = new CartDTO(cart.id, products);
      res.status(200).json(cartDTO);
    } catch (error) {
      next(error);
    }
  },

  updateCart: async (req, res, next) => {
    try {
      const cartId = req.params.cid;
      const updateData = req.body.products;
      const cart = await cartService.updateCart(cartId, updateData);
      const products = cart.products.map((product) => {
        const { _id, title, description, price, thumbnail, code, stock } =
          product._id;
        return {
          _id,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
          quantity: product.quantity,
        };
      });
      const cartDTO = new CartDTO(cart._id, products);
      console.log("cartDTO", cart);
      console.log("cartDTO", products);
      res.status(200).json(cartDTO);
    } catch (error) {
      next(error);
    }
  },
  updateProductQuantityInCart: async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const cart = await cartService.updateProductQuantityInCart(
        cid,
        pid,
        quantity
      );
      const products = cart.products.map((product) => ({
        id: product._id,
        quantity: product.quantity,
      }));
      const cartDTO = new CartDTO(cart.id, products);
      res.status(200).json(cartDTO);
    } catch (error) {
      next(error);
    }
  },
  deleteAllProductsCart: async (req, res, next) => {
    try {
      const { cid } = req.params;
      const cart = await cartService.deleteAllProductsFromCart(cid);
      const cartDTO = new CartDTO(cart.id, []);
      res.status(200).json(cartDTO);
    } catch (error) {
      next(error);
    }
  }
};
