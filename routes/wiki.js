const express = require("express");
const { Page } = require("../models/index");
const addPage = require("../views/addPage"); // path to addPage file
const wikiPage = require("../views/wikipage"); // path to wikiPage file

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("retrieve all wiki pages, got to GET /wiki/");
});

router.post("/", async (req, res, next) => {
  //add definitions for 'title' and 'content'
  try {
    const page = await Page.create({
      //create a new row in the database
      title: req.body.title,
      content: req.body.content,
    });
    // after adding page
    // go to that single-page view
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
});

// SINGLE-PAGE route
router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    res.send(wikiPage(page));
  } catch (err) {
    next(err);
  }
  //   res.send(`hit dynamic route at ${req.params.slug}`);
});

module.exports = router;
