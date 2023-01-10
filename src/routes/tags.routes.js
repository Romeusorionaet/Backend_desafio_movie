const {Router} = require("express");

const TagsController = require("../controllers/TagsController");
const ensureAuthenticated = require("../midlewares/ensoreAuthenticated");

const tagsRoutes = Router();

const tagsController = new TagsController();

tagsRoutes.get("/", ensureAuthenticated, tagsController.index);

module.exports = tagsRoutes;