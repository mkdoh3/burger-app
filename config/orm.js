const connection = require("./connection.js");


//borrowed helper from the repo
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
    insertOne: function (table, cols, val, cb) {
        let qs = "INSERT INTO " + table;
        qs += " (";
        qs += cols;
        qs += ")";
        qs += " VALUES ('";
        qs += val;
        qs += "') ";

        console.log(qs)

        connection.query(qs, val, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    updateOne: function (table, obj, condition, cb) {
        let qs = "UPDATE " + table;
        qs += " SET ";
        qs += objToSql(obj);
        qs += " WHERE ";
        qs += condition;
        console.log(qs)
        connection.query(qs, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    deleteOne: function (table, condition, cb) {
        let qs = "DELETE FROM " + table;
        qs += " WHERE ";
        qs += condition;
        console.log(qs)
        connection.query(qs, function (err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        })
    }



}
module.exports = orm;
