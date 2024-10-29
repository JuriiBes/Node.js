import { Router } from "express";
const router = Router();

function siteNameDefinition(requestUser) {
  switch (requestUser) {
    case "sites":
      return "../views/more_info/sites.ejs";

    case "films":
      return "../views/more_info/films.ejs";

    case "me":
      return "../views/more_info/info.ejs";

    default:
      return "index";
  }
}

router.get("/:myLinks", (req, res) => {
  let myLinks = req.params["myLinks"];
  res.render(siteNameDefinition(myLinks));
});

export default router;
