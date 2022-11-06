const { Router } = require("express");
const router = Router();
const constructor = require("../constructor/users");

router.get('/signup', constructor.signup)

router.get('/login', constructor.login)

router.post('/signup', constructor.add)

router.post('/login', constructor.join)

router.get('/logout', constructor.logout)

module.exports = router;