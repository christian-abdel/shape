var express = require('express');
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://abdel_christian:aaa123@cluster0.adniy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

router.post('/register',(request,response) => {

    console.log(request.body);
});
module.exports = router;
