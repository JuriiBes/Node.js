import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/goals", (req, res) => {
  res.render("goals");
});

router.get("/about", (req, res) => {
  res.render("../public/html/about.ejs");
});

router.get("/news", (req, res) => {
  res.render("../public/html/news.ejs");
});

export default router;
