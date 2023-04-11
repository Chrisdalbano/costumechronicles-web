// module.exports = async function (context, req) {
//     context.res.json({
//         text: "Connected"
//     });
// };

const mysql = require('mysql2/promise');

module.exports = async function (context, req) {
    const config = {
        host: 'ecommerce.mysql.database.azure.com',
        user: 'admin_costumechronicles',
        password: 'costumechronicles1!',
        database: 'ecommerce',
    };

    let connection;

    try {
        connection = await mysql.createConnection(config);
        const [rows] = await connection.execute('SELECT `product_name`, `price` FROM `ecommerce products` WHERE `product_id` = ?', [1]);
        context.res = {
            status: 200,
            body: rows[0],
        };
    } catch (err) {
        context.log.error('Error:', err); // Log the error details
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