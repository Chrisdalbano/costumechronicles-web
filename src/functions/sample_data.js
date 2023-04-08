
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
      var products = [];

      conn.query('SELECT * FROM products', 
        function (err, results, fields) {
          if (err) throw err;
          else console.log('Selected ' + results.length + ' row(s).');
          for (i = 0; i < results.length; i++) {
              console.log('Row: ' + JSON.stringify(results[i]));
              products.push(results[i]);
          }
          localStorage.setItem('products', JSON.stringify(products));
          console.log('Done.');
      });
      
      conn.end(
        function (err) { 
            if (err) throw err;
            else  console.log('Closing connection.') 
      });
    }
});



