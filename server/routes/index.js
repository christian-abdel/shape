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
    var height = parseInt(req.body.height);
    var weight = parseInt(req.body.weight);

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
            var myobj = { username: `${username}`, password: `${pwd}`, height: `${height}`, weight: `${weight}` };
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

router.get('/getfoods', function (req, res, next) {
    
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("food").collection("food1");
        collection.find().toArray((err, result) => {
            if (err) console.log(err.message);
            else { res.send(result); }
            client.close();
        });
    });
    
});

router.post('/addFood', function(req, res) {
    var username = req.body.username;
    var food = req.body.cibo;
    var pasto = req.body.pasto;
    var grammi = req.body.grammi;
    var data = req.body.data;

    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    client.connect(err => {
        var len;
        const collection = client.db("userData").collection("cibi");
        const collection1 = client.db("userData").collection("pasti");
        /*collection1.find({ 'nome': `${pasto}` }).limit(1).toArray((err, result) => {
            if (err) console.log(err.message);
            else {
                len = result.length;
                if(len != 1) {
                   var myobj = { utente: `${username}`, nome: `${pasto}`, data: `${Date.now()}` };
                    collection1.insertOne(myobj, function(err, res) {
                        if (err) throw err;
                    });
                }
            }
        });**/

        
        var myobj = { utente: `${username}`, nome: `${food}`, pasto: `${pasto}`, grammi: `${grammi}`, data: `${data}` };
        collection.insertOne(myobj, function(err, res) {
            if (err) throw err;
        });
        res.send("");
        setTimeout(function () {
                client.close();
            }, 500);

    });
    
});

router.get('/getUserData/:username', function (req, res, next) {
    var username = req.params.username;
    
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("userData").collection("cibi");
        collection.find({utente: `${username}`}).toArray((err, result) => {
            if (err) console.log(err.message);
            else { res.send(result); }
            client.close();
        });
    });
    
});

module.exports = router;
