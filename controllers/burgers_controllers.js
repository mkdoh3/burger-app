const express = require('express');

const router = express.Router();

const burger = require('../models/burgers.js');



router.get("/", function (req, res) {
    burger.selectAll(function (allDaBurgers) {
        let hbsBurgersObj = {
            burgers: allDaBurgers
        };
        res.render('index', hbsBurgersObj)
    });
});

router.post('/api/burgers', function (req, res) {
    burger.insertOne("burger_name", req.body.name, function (result) {
        console.log('burger added');
    });
});

router.put("/api/burgers/:id", function (req, res) {
    let condition = "id = " + req.params.id;
    let param = req.body;
    burger.updateOne(param, condition, function (result) {
        if (result.changedRows === 0) {
            console.log('not found');
            return res.status(404).end();
        } else {
            console.log("update successful")
            res.status(200).end();
        }
    });

    router.delete("/api/burgers/:id", function (req, res) {
        let condition = "id = " + req.params.id;
        burger.deleteOne(condition, function (result) {
            if (result.affectedRows === 0) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        })

    })

});


module.exports = router;
