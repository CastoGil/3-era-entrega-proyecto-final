import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { productService } from "../../services/productsService.js";
import {ProductDTO } from "../../Dto/productDto.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const getAllProductsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || "";
    const query = req.query.query || "";
    const token = req.cookies.token || "";
    const admin = req.cookies.role || "";

    const response = await productService.getAllProducts(query, sort, page, limit);
    //se puede enviar solo el productsDTO , en este caso envio response//
    const productsDTO = response.payload.map(
      (product) =>
        new ProductDTO(
          product._id,
          product.title,
          product.description,
          product.price,
          product.thumbnail[0],
          product.code,
          product.stock,
          product.category
        )
    );
      console.log(productsDTO)
    if (token) {
      const user = jwt.verify(token, JWT_SECRET);
      const data = {
        response,
        first_name: user ? user.first_name : null,
        role: user ? user.role : null,
        token,
      };
      res.render("products", data);
    } else {
      const data = { response , admin };
      res.render("products", data);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/////////////////Mostramos por Id el producto///////////////////////////
const getProductByIdController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productService.getProductById(pid);
    const productDTO = new ProductDTO(
      product._id,
      product.title,
      product.description,
      product.price,
      product.thumbnail,
      product.code,
      product.stock,
      product.category
    );
    return res.render("detailProduct", productDTO);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

////////////////////Agregamos productos////////////////////////////////
const createProductController = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    const productDTO = new ProductDTO(
      product._id,
      product.title,
      product.description,
      product.price,
      product.thumbnail,
      product.code,
      product.stock,
      product.category
    );
    res.status(201).json(productDTO);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//////////////Actualizamos un producto pasándole los datos necesarios////////
const updateProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productService.updateProduct(pid, req.body);
    const productDTO = new ProductDTO(
      product._id,
      product.title,
      product.description,
      product.price,
      product.thumbnail,
      product.code,
      product.stock,
      product.category
    );
    res.status(201).json(productDTO);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/////////////////Eliminamos un producto///////////////////////////
const deleteProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    await productService.deleteProduct(pid);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
};
