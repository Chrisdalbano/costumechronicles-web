// module.exports = async function (context, req) {
//     context.res.json({
//         text: "Connected"
//     });
// };

const sql = require('mssql');

module.exports = async function (context, req) {
    const config = {
        user: 'admin_costumechronicles',
        password: 'costumechronicles1!',
        server: 'ecommerce.mysql.database.azure.com',
        database: 'ecommerce',
        options: {
            encrypt: true,
            trustServerCertificate: false,
        },
    };

    try {
        await sql.connect(config);
        const result = await sql.query`SELECT name, price FROM products WHERE id = 1`;
        context.res = {
            status: 200,
            body: result.recordset[0],
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: "Error fetching data from the database",
        };
    } finally {
        sql.close();
    }
};