import { Router } from "express";
import CartManager from "../manager/cart_manager.js";

const router = Router();

const cartManager = new CartManager("./src/files/carts.json");

router.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.send({ status: "success", payload: carts });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cid = Number(req.params.cid);
    let cartSelected = await cartManager.getCartById(cid);
    let productsSelected = cartSelected.products;
    res.send({ status: "success found", payload: productsSelected });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const cart = await cartManager.addCart();
    res.send({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/:cid/product/:pid/qty/:qty", async (req, res) => {
  try {
    const pid = Number(req.params.pid);
    const cid = Number(req.params.cid);
    const qty = Number(req.params.qty);
    const updatedCart = await cartManager.updateProductByCart(cid, pid, qty);
    res.send({ status: "success", payload: updatedCart });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const cid = Number(req.params.cid);
    await cartManager.deleteCart(cid);
    res.send({ status: "success deleted" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
