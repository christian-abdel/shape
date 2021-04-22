var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://abdel_christian:aaa123@cluster0.adniy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

router.post('/register', function(req, res) {
    var username = req.body.username;
    var pwd = req.body.pwd;

    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(err => {
        var len;
        const collection = client.db("data").collection("users");
        collection.find({ 'username': `${username}` }).toArray((err, result) => {
            if (err) console.log(err.message);
            else {
                len = result.length;
                if(len == 1) {
                    client.close();
                    res.send({ status: "existing_user" });
                }
            }
        });

        if (len != 1) {
            var myobj = { username: `${username}`, password: `${pwd}` };
            collection.insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log(`Utente ${username} registrato correttamente!`);
            });
            
            setTimeout(function () {
                res.send({ status: "done" });
                client.close();
            }, 750);
        }
    });
    
});

router.post('/login', function (req, res, next) {
    var username = req.body.username;
    
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("data").collection("users");
        collection.find({ 'username': `${username}` }).limit(1).toArray((err, result) => {
            if (err) console.log(err.message);
            else { res.send(result); }
            client.close();
        });
    });
    
});

module.exports = router;
