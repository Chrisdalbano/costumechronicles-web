const mysql = require('mysql');
const fs = require('fs');

var config =
{
    host: 'ecommerce.mysql.database.azure.com',
    user: 'admin_costumechronicles',
    password: 'costumechronicles1!',
    database: 'ecommerce',
    port: 3306,
    ssl: {ca: fs.readFileSync("query/DigiCertGlobalRootCA.crt.pem")}
};

const conn = new mysql.createConnection(config);

conn.connect(
    function (err) { 
    if (err) { 
        console.log("!!! Cannot connect !!! Error:");
        throw err;
    }
    else
    {
        console.log("Connection established.");
        /*queryDatabase();*/
        /*insertData();*/
        /*updateData();*/
        readData();
    }
});

function queryDatabase()
{
    conn.query('ALTER TABLE products ADD COLUMN category VARCHAR(255);', 
        function (err, results, fields) {
            if (err) throw err;
            console.log('Primary key added.');
        }
    )
};

function insertData() {
    conn.query('INSERT INTO products (product_name, price, stock, source, category) VALUES (?, ?, ?, ?, ?);', 
    ["One piece Hat", 39.99, 100, "./merch/collectible-1.jpeg", "collectibles"], 
        function (err, results, fields) {
            if (err) throw err;
        }
    )
}

function updateData(){
    conn.query('UPDATE products SET price = ? WHERE product_id = ?', [149.99, 3], 
         function (err, results, fields) {
             if (err) throw err;
        }
    )
};

function readData(){
    conn.query('SELECT * FROM products', 
        function (err, results, fields) {
            if (err) throw err;
            else console.log('Selected ' + results.length + ' row(s).');
            for (i = 0; i < results.length; i++) {
                console.log('Row: ' + JSON.stringify(results[i]));
            }
            console.log('Done.');
        })
    conn.end(
        function (err) { 
            if (err) throw err;
            else  console.log('Closing connection.') 
    });
};