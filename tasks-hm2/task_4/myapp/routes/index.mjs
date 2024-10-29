import { Router } from "express";
import productsList from "../public/data/products.json" assert { type: "json" };

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/products", (req, res) => {
  res.render("products", { productsList });
});

router.get("/addProducts", (req, res) => {
  res.render("addProducts");
});

export default router;
