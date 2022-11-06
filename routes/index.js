const { Router } = require("express");
const router = Router();
const constructor = require("../constructor/index");

router.get("/", constructor.get);

module.exports = router;
