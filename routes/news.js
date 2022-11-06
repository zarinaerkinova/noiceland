const {Router} = require('express')
const router = Router()
const constructor = require('../constructor/news')

router.get('/', constructor.get)

router.get('/add', constructor.add)

router.post('/add', constructor.postNews)

module.exports = router