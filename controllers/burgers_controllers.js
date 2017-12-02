const express = require('express');

const router = express.Router();

const burger = require('../models/burgers.js');



router.get("/", function (req, res) {
    burger.selectAll(function (allDaBurgers) {
        let hbsBurgersObj = {
            burgers: allDaBurgers
        };
        console.log(hbsBurgersObj)
        res.render('index', hbsBurgersObj)
    });
});

router.post('/api/burgers', function (req, res) {
    burger.insertOne("burger_name", req.body.name, function (result) {
        console.log(result);
    });
})

router.put("/api/burgers/:id", function (req, res) {
    let condition = "id = " + req.params.id;

    burger.updateOne(condition, function (result) {
        if (result.changedRows === 0) {
            console.log('not found');
            return res.status(404).end();
        } else {
            console.log("update successful")
            res.status(200).end();
        }
    });
});


module.exports = router;
