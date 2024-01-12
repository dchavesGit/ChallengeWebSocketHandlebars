import { Router } from "express";

import ProductManager from "../manager/product_manager.js";

const router = Router();

const productManager = new ProductManager("./src/files/products.json");

router.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {
    products: await productManager.getProducts(),
  });
});

router.get("/", async (req, res) => {
  // CHECK
  try {
    const products = await productManager.getProducts();
    const { limit } = req.query;
    if (!limit) {
    } else {
      if (limit < products.length) {
        products.splice(limit - products.length);
      }
    }
    console.log(products);
    res.render("home", { products });
  } catch (error) {
    console.log(error);
  }
});

export default router;
