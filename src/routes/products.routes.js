import { Router } from "express";
import ProductManager from "../manager/product_manager.js";

const router = Router();

const productManager = new ProductManager("./src/files/products.json");

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const { limit } = req.query;
    if (!limit) {
    } else {
      if (limit < products.length) {
        products.splice(limit - products.length);
      }
    }
    res.send({ status: "success", payload: products });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const pid = parseInt(req.params.pid);
    const productSelected = products.find((p) => p.id === pid);
    if (!productSelected) {
      res
        .status(400)
        .send({ status: "not success", data: "Product not found" });
    } else {
      res.send(productSelected);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const result = await productManager.addProduct(product);
    const io = req.app.get("socketio");
    console.log("este es el product agregado =>", result);
    io.emit("productAdd", JSON.stringify(result));
    console.log(JSON.stringify(result));
    res.send({ status: "added success", payload: result });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const pid = req.params;
    const updatedProduct = req.body;
    await productManager.updateProduct(pid, updatedProduct);
    res.send({ status: "success", payload: updatedProduct });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const pid = Number(req.params.pid);
    await productManager.deleteProduct(pid);
    const io = req.app.get("socketio");
    io.emit("productDelete", pid);
    res.send({ status: "success product deleted" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
