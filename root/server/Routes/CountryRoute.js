const { Create, Patch, Get, Delete } = require('../Controllers/CountryController')
const router = require('express').Router()

router.post('/createCountry', Create);
router.get('/getCountry/:id', Get);
router.patch('/updateCountry/:id', Patch);
router.delete('/deleteCountry/:id', Delete);


module.exports = router