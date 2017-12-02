const connection = require("./connection.js");

//borrowed these helpers from the repo
function insertQMarks(num) {
    let arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}
// Helper function to convert object key/value pairs to SQL syntax
function objToSql(obj) {
    let arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in obj) {
        let value = obj[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(obj, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

const orm = {
    selectAll: function (table, cb) {
        let qs = "SELECT * FROM " + table + ";";
        connection.query(qs, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    insertOne: function (table, cols, vals, cb) {
        let qs = "INSERT INTO " + table;
        qs += " (";
        qs += cols.toString();
        qs += ")";
        qs += "VALUES (";
        qs += insertQMarks(vals.length);
        qs += ") ";

        connection.query(qs, vals, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    updateOne: function (table, Obj, condition, cb) {
        let qs = "UPDATE " + table;
        qs += " SET ";
        qs += objToSql(Obj);
        qs += " WHERE ";
        qs += condition;

        connection.query(qs, vals, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
}
module.exports = orm;
