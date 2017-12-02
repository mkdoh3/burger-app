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
    console.log("posr req body!!!!!!!!!!!!!!!!!!!!!!!!!!!!", req.body);
    burger.insertOne("burger_name", req.body.name, function (result) {
        console.log(result);
    });
})

router.put("/api/burgers/:id", function (req, res) {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", req.body, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    let condition = "id = " + req.params.id;
    //couldn't figure out how to get the obj passed to the ajax data option in burger.js

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
});


module.exports = router;
