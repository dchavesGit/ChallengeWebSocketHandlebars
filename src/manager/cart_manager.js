import fs from "fs";
const path = "../files/carts.json";

export default class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const carts = JSON.parse(data);
        return carts;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async addCart() {
    try {
      const carts = await this.getCarts();
      const cart = {
        products: [],
      };
      if (carts.length === 0) {
        cart.id = 1;
      } else {
        cart.id = carts[carts.length - 1].id + 1;
      }
      carts.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
    } catch (error) {
      console.error(error.message);
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getCarts();
      let cart = carts.find((c) => c.id === id);
      if (cart) return cart;
      console.log("Cart not found.");
    } catch (error) {
      console.error(error.message);
    }
  }

  async updateProductByCart(cid, pid, qty) {
    try {
      const newProduct = {
        id: pid,
        qty: qty,
      };
      const carts = await this.getCarts();
      const cart = carts.find((elm) => elm.id === cid);
      const cartProducts = cart.products;
      if (!cart) {
        console.log("Not found cart to update");
        return;
      }
      if (cartProducts.length === 0) {
        cartProducts.push(newProduct);
      } else {
        cartProducts.forEach((p) => {
          if (pid === p.id) {
            p.qty = p.qty + newProduct.qty;
          }
        });
      }
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
    } catch (error) {
      console.error(error.message);
    }
  }

  async deleteCart(id) {
    try {
      const carts = await this.getCarts();
      const cartIndex = carts.findIndex((c) => c.id === id);
      console.log(id);
      if (cartIndex === -1) {
        console.log("Cart not found");
        return;
      } else {
        carts.splice(cartIndex, 1);
      }
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
    } catch (error) {
      console.error(error.message);
    }
  }
}
