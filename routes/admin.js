const { Router } = require("express");
const router = Router();
const constructor = require("../constructor/admins");

router.get('/signin', constructor.signin)

router.get('/signup', constructor.signup)

router.post('/signin', constructor.join)

router.post('/signup', constructor.add)

router.get('/logout', constructor.logout)

module.exports = router;