// module.exports = async function (context, req) {
//     context.res.json({
//         text: "Connected"
//     });
// };

const mysql = require('mysql2/promise');
const fs = require('fs');

module.exports = async function (context, req) {
    const config = {
        host: 'ecommerce.mysql.database.azure.com',
        user: 'admin_costumechronicles',
        password: 'costumechronicles1!',
        database: 'ecommerce',
        ssl: {
            ca: fs.readFileSync('message/DigiCertGlobalRootCA.crt.pem')
        }
    };

    let connection;

    try {
        console.log('Trying connection...');
        connection = await mysql.createConnection(config);
        console.log('Succesfully connected.');
        const [rows] = await connection.execute('SELECT `product_name`, `price` FROM products WHERE `product_id` = ?', [1]);
        context.res = {
            status: 200,
            body: rows[0],
        };
    } catch (err) {
        context.log('Error:', err); // Change this line
        context.res = {
            status: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Error fetching data from the database" }),
        };
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};