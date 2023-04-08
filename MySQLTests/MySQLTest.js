const mysql = require('mysql');
const fs = require('fs');

var config =
{
    host: 'ecommerce.mysql.database.azure.com',
    user: 'admin_costumechronicles',
    password: 'costumechronicles1!',
    database: 'ecommerce',
    port: 3306,
    ssl: {ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}
};

const conn = new mysql.createConnection(config);

conn.connect(
  function (err) { 
    if (err) { 
        console.log("!!! Cannot connect !!! Error:");
        throw err;
    }
    else {
        console.log("Connection established.");
        /*queryDatabase();*/
        readData();
    }
 }
);

/*function queryDatabase()
{
    conn.query('DROP TABLE IF EXISTS inventory;', 
        function (err, results, fields) { 
            if (err) throw err; 
            console.log('Dropped inventory table if existed.');
        }
    )
    conn.query('CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);', 
        function (err, results, fields) {
            if (err) throw err;
            console.log('Created inventory table.');
        }
    )
    conn.query('INSERT INTO products (product_name, price, stock) VALUES (?, ?, ?);', ['snowWhite', 150, 50], 
        function (err, results, fields) {
            if (err) throw err;
            else console.log('Inserted ' + results.affectedRows + ' row(s).');
        }
    )
    conn.end(function (err) { 
        if (err) throw err;
        else  console.log('Done.') 
    });
};*/

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